import { RouteDiscoveryService } from './RouteDiscoveryService';
import { RouteIndex, RouteDetails } from '../helpers/SwaggerHelper';
import { OpenAI } from 'openai';

export interface QueryContext {
  churchId?: string;
  userId?: string;
  permissions?: string[];
}

export interface QueryResult {
  intent: string;
  selectedRoutes: RouteIndex[];
  apiCall?: {
    service: string;
    method: string;
    path: string;
    parameters?: Record<string, any>;
    headers?: Record<string, string>;
  };
  explanation: string;
  confidence: number;
}

/**
 * OpenAI Query Orchestration Service
 * 
 * Handles natural language queries and converts them to API calls
 * using the token-efficient route discovery system.
 */
export class OpenAIQueryService {
  private static instance: OpenAIQueryService;
  private routeDiscovery: RouteDiscoveryService;
  private openai: OpenAI;
  private isInitialized = false;

  private constructor() {
    this.routeDiscovery = RouteDiscoveryService.getInstance();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): OpenAIQueryService {
    if (!OpenAIQueryService.instance) {
      OpenAIQueryService.instance = new OpenAIQueryService();
    }
    return OpenAIQueryService.instance;
  }

  /**
   * Initialize the service (load route index)
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    await this.routeDiscovery.loadRouteIndex();
    this.isInitialized = true;
    
    console.log('🤖 OpenAI Query Service initialized');
  }

  /**
   * Process a natural language query
   */
  public async processQuery(
    query: string, 
    context: QueryContext = {}
  ): Promise<QueryResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Step 1: Analyze query intent and find relevant routes
      const routeAnalysis = await this.analyzeQueryForRoutes(query, context);
      
      // Step 2: If routes found, get detailed specs and generate API call
      let apiCall;
      if (routeAnalysis.selectedRoutes.length > 0) {
        apiCall = await this.generateApiCall(
          routeAnalysis.selectedRoutes[0], // Use the best match
          query,
          context
        );
      }

      return {
        intent: routeAnalysis.intent,
        selectedRoutes: routeAnalysis.selectedRoutes,
        apiCall,
        explanation: routeAnalysis.explanation,
        confidence: routeAnalysis.confidence
      };

    } catch (error) {
      console.error('❌ Error processing query:', error);
      throw error;
    }
  }

  /**
   * Analyze query and find relevant routes using OpenAI
   */
  private async analyzeQueryForRoutes(
    query: string, 
    context: QueryContext
  ): Promise<{
    intent: string;
    selectedRoutes: RouteIndex[];
    explanation: string;
    confidence: number;
  }> {
    // Get lightweight route summary for OpenAI context
    const routeSummary = this.routeDiscovery.getOpenAIRouteSummary();
    
    const prompt = `You are an API route selector for a church management system. 
Given a user query, identify the most relevant API routes.

User Query: "${query}"

Context:
- Church ID: ${context.churchId || 'not specified'}
- User permissions: ${context.permissions?.join(', ') || 'not specified'}

${routeSummary}

Please analyze the query and respond with a JSON object containing:
{
  "intent": "Brief description of what the user wants to do",
  "routeKeys": ["array of most relevant routeKey values from the list above"],
  "explanation": "Why these routes were selected",
  "confidence": number between 0-1 indicating confidence in the match
}

Only include routes that directly relate to the user's query. Limit to 3 most relevant routes.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    
    // Convert route keys to RouteIndex objects
    const selectedRoutes: RouteIndex[] = [];
    if (analysis.routeKeys && Array.isArray(analysis.routeKeys)) {
      const allRoutes = this.routeDiscovery.getRouteIndex();
      analysis.routeKeys.forEach((routeKey: string) => {
        const route = allRoutes.find(r => r.routeKey === routeKey);
        if (route) selectedRoutes.push(route);
      });
    }

    return {
      intent: analysis.intent || 'Unknown intent',
      selectedRoutes,
      explanation: analysis.explanation || 'No explanation provided',
      confidence: analysis.confidence || 0
    };
  }

  /**
   * Generate specific API call parameters
   */
  private async generateApiCall(
    route: RouteIndex,
    query: string,
    context: QueryContext
  ): Promise<{
    service: string;
    method: string;
    path: string;
    parameters?: Record<string, any>;
    headers?: Record<string, string>;
  }> {
    // Get detailed route specifications
    const routeDetails = await this.routeDiscovery.getRouteDetails(route.routeKey);
    
    if (!routeDetails) {
      throw new Error(`Route details not found for ${route.routeKey}`);
    }

    const prompt = `Generate API call parameters for this route based on the user query.

User Query: "${query}"
Route: ${route.method} ${route.path}
Summary: ${route.summary}

Route Parameters:
${JSON.stringify(routeDetails.parameters, null, 2)}

Context:
- Church ID: ${context.churchId || 'not specified'}

Please respond with a JSON object containing:
{
  "parameters": {object with parameter values extracted from the query},
  "pathSubstitutions": {object with path parameter substitutions if any},
  "queryParams": {object with query parameter values},
  "explanation": "How the parameters were derived from the query"
}

Only include parameters that can be reasonably inferred from the user query.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const paramAnalysis = JSON.parse(response.choices[0].message.content || '{}');
    
    // Build the API call object
    let finalPath = route.path;
    
    // Apply path substitutions
    if (paramAnalysis.pathSubstitutions) {
      Object.entries(paramAnalysis.pathSubstitutions).forEach(([key, value]) => {
        finalPath = finalPath.replace(`{${key}}`, String(value));
      });
    }

    return {
      service: route.service,
      method: route.method,
      path: finalPath,
      parameters: {
        ...paramAnalysis.queryParams,
        ...paramAnalysis.parameters
      },
      headers: {
        'Authorization': 'Bearer {jwt_token}',
        'Content-Type': 'application/json'
      }
    };
  }

  /**
   * Get service statistics
   */
  public getStats() {
    return this.routeDiscovery.getRouteStats();
  }

  /**
   * Search routes directly
   */
  public searchRoutes(query: string): RouteIndex[] {
    return this.routeDiscovery.searchRoutes(query);
  }

  /**
   * Get all available routes
   */
  public getAllRoutes(): RouteIndex[] {
    return this.routeDiscovery.getRouteIndex();
  }
}