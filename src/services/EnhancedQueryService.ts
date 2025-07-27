import { QueryClassifier, QueryClassification } from './QueryClassifier';
import { RouteSelector, RouteSelectionResult } from './RouteSelector';
import { DataProcessor, ProcessedResponse, ApiCallResult } from './DataProcessor';
import { OpenAI } from 'openai';
import { Environment } from '../helpers/Environment';
import axios from 'axios';

export interface EnhancedQueryContext {
  churchId: string;
  userId: string;
  tokens: {
    attendanceApiToken?: string;
    contentApiToken?: string;
    doingApiToken?: string;
    givingApiToken?: string;
    membershipApiToken?: string;
    messagingApiToken?: string;
    reportingApiToken?: string;
  };
}

export interface EnhancedQueryResult {
  answer: string;
  classification: QueryClassification;
  routeSelection: RouteSelectionResult;
  processedData: ProcessedResponse;
  execution: {
    totalTime: number;
    classificationTime: number;
    routeSelectionTime: number;
    apiCallTime: number;
    dataProcessingTime: number;
    finalAnswerTime: number;
  };
  tokenUsage: {
    classificationTokens: number;
    finalAnswerTokens: number;
    totalTokens: number;
    tokensSaved: number; // Estimated tokens saved vs traditional approach
  };
  confidence: number;
}

/**
 * EnhancedQueryService - Ultra-efficient AI query execution
 * 
 * Orchestrates the multi-phase pipeline for natural language query execution
 * with minimal token usage through intelligent preprocessing and caching.
 */
export class EnhancedQueryService {
  private static instance: EnhancedQueryService;
  private queryClassifier: QueryClassifier;
  private routeSelector: RouteSelector;
  private dataProcessor: DataProcessor;
  private openai: OpenAI;
  private isInitialized = false;

  // Service base URLs for API calls
  private static readonly SERVICE_URLS = {
    'membershipapi': 'https://membershipapi.staging.churchapps.org',
    'attendanceapi': 'https://attendanceapi.staging.churchapps.org',
    'contentapi': 'https://contentapi.staging.churchapps.org',
    'doingapi': 'https://doingapi.staging.churchapps.org',
    'givingapi': 'https://givingapi.staging.churchapps.org',
    'messagingapi': 'https://messagingapi.staging.churchapps.org'
  };

  private constructor() {
    this.queryClassifier = QueryClassifier.getInstance();
    this.routeSelector = RouteSelector.getInstance();
    this.dataProcessor = DataProcessor.getInstance();
    this.openai = new OpenAI({
      apiKey: Environment.openAiApiKey
    });
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): EnhancedQueryService {
    if (!EnhancedQueryService.instance) {
      EnhancedQueryService.instance = new EnhancedQueryService();
    }
    return EnhancedQueryService.instance;
  }

  /**
   * Initialize all components
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    await Promise.all([
      this.queryClassifier.initialize(),
      this.routeSelector.initialize(),
      this.dataProcessor.initialize()
    ]);

    this.isInitialized = true;
    console.log('🚀 Enhanced Query Service initialized');
  }

  /**
   * Execute an enhanced query with minimal token usage
   */
  public async executeQuery(
    query: string,
    context: EnhancedQueryContext
  ): Promise<EnhancedQueryResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const startTime = Date.now();
    let classificationTime = 0;
    let routeSelectionTime = 0;
    let apiCallTime = 0;
    let dataProcessingTime = 0;
    let finalAnswerTime = 0;

    try {
      console.log(`🔄 Processing enhanced query: "${query}"`);

      // Phase 1: Classify the query (minimal AI usage)
      const classificationStart = Date.now();
      const classification = await this.queryClassifier.classifyQuery(query);
      classificationTime = Date.now() - classificationStart;
      
      console.log(`📊 Classification: ${classification.intent} (${classification.confidence.toFixed(2)} confidence)`);
      console.log(`🎯 Entities:`, classification.entities);

      // Phase 2: Select routes (rule-based, no AI)
      const routeSelectionStart = Date.now();
      const routeSelection = await this.routeSelector.selectRoutes(classification);
      routeSelectionTime = Date.now() - routeSelectionStart;
      
      console.log(`🛣️ Selected route: ${routeSelection.primaryRoute.route.method} ${routeSelection.primaryRoute.route.path}`);
      console.log(`📈 Route confidence: ${routeSelection.primaryRoute.confidence.toFixed(2)}`);

      // Phase 3: Execute API call
      const apiCallStart = Date.now();
      const apiResult = await this.executeApiCall(routeSelection.primaryRoute, context);
      apiCallTime = Date.now() - apiCallStart;
      
      console.log(`📡 API call ${apiResult.status}: ${apiResult.status === 'success' ? 'Success' : apiResult.error}`);

      // Phase 4: Process and filter data (local processing)
      const dataProcessingStart = Date.now();
      const processedData = await this.dataProcessor.processApiResponse(apiResult, classification);
      dataProcessingTime = Date.now() - dataProcessingStart;
      
      console.log(`⚙️ Processed ${processedData.metadata.totalRecords} → ${processedData.metadata.filteredRecords} records`);

      // Phase 5: Generate final answer (minimal AI usage)
      const finalAnswerStart = Date.now();
      const { answer, finalAnswerTokens } = await this.generateFinalAnswer(
        query,
        classification,
        processedData
      );
      finalAnswerTime = Date.now() - finalAnswerStart;

      const totalTime = Date.now() - startTime;
      
      // Calculate token usage
      const classificationTokens = this.estimateClassificationTokens(query);
      const totalTokens = classificationTokens + finalAnswerTokens;
      const tokensSaved = this.estimateTokensSaved(processedData.metadata.totalRecords);

      console.log(`✅ Query completed in ${totalTime}ms using ${totalTokens} tokens (saved ~${tokensSaved})`);

      return {
        answer,
        classification,
        routeSelection,
        processedData,
        execution: {
          totalTime,
          classificationTime,
          routeSelectionTime,
          apiCallTime,
          dataProcessingTime,
          finalAnswerTime
        },
        tokenUsage: {
          classificationTokens,
          finalAnswerTokens,
          totalTokens,
          tokensSaved
        },
        confidence: Math.min(classification.confidence, routeSelection.primaryRoute.confidence)
      };

    } catch (error) {
      console.error('❌ Enhanced query execution failed:', error);
      throw error;
    }
  }

  /**
   * Execute the selected API call
   */
  private async executeApiCall(
    routeMatch: RouteSelectionResult['primaryRoute'],
    context: EnhancedQueryContext
  ): Promise<ApiCallResult> {
    try {
      const { route, parameters } = routeMatch;
      
      // Get the appropriate token
      const tokenKey = this.getTokenKey(route.service);
      const token = context.tokens[tokenKey];
      
      if (!token) {
        return {
          route: routeMatch,
          data: null,
          status: 'error',
          error: `No authentication token available for ${route.service}`
        };
      }

      // Build the API request
      const baseUrl = EnhancedQueryService.SERVICE_URLS[route.service as keyof typeof EnhancedQueryService.SERVICE_URLS];
      if (!baseUrl) {
        return {
          route: routeMatch,
          data: null,
          status: 'error',
          error: `Unknown service: ${route.service}`
        };
      }

      const url = `${baseUrl}${route.path}`;
      
      // Prepare request configuration
      const requestConfig: any = {
        method: route.method.toLowerCase(),
        url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      };

      // Add body data for POST requests
      if (route.method.toUpperCase() === 'POST' && parameters.body) {
        requestConfig.data = parameters.body;
      }

      // Add query parameters for GET requests
      if (route.method.toUpperCase() === 'GET' && parameters.query) {
        requestConfig.params = parameters.query;
      }

      console.log(`📞 API Call: ${route.method} ${url}`);
      if (requestConfig.data) {
        console.log(`📝 Payload:`, JSON.stringify(requestConfig.data, null, 2));
      }

      // Execute the API call
      const response = await axios(requestConfig);
      
      console.log(`📈 Response: ${response.status} - ${Array.isArray(response.data) ? `${response.data.length} items` : typeof response.data}`);

      return {
        route: routeMatch,
        data: response.data,
        status: 'success'
      };

    } catch (error: any) {
      console.error(`📞 API call failed:`, error.message);
      
      return {
        route: routeMatch,
        data: null,
        status: 'error',
        error: error.response?.data?.message || error.message || 'API call failed'
      };
    }
  }

  /**
   * Get the token key for a service
   */
  private getTokenKey(service: string): keyof EnhancedQueryContext['tokens'] {
    const serviceMap: Record<string, keyof EnhancedQueryContext['tokens']> = {
      'membershipapi': 'membershipApiToken',
      'attendanceapi': 'attendanceApiToken',
      'contentapi': 'contentApiToken',
      'doingapi': 'doingApiToken',
      'givingapi': 'givingApiToken',
      'messagingapi': 'messagingApiToken',
      'reportingapi': 'reportingApiToken'
    };

    return serviceMap[service] || 'membershipApiToken';
  }

  /**
   * Generate the final answer using minimal AI context
   */
  private async generateFinalAnswer(
    originalQuery: string,
    classification: QueryClassification,
    processedData: ProcessedResponse
  ): Promise<{ answer: string; finalAnswerTokens: number }> {
    
    // For simple count/aggregate queries, we can answer directly without AI
    if (classification.intent === 'count' && processedData.aggregations) {
      const count = processedData.aggregations.total_count || 0;
      let answer = `I found ${count} ${classification.entities.subject}`;
      
      if (classification.entities.value) {
        answer += ` with ${classification.entities.attribute}="${classification.entities.value}"`;
      }
      
      answer += '.';
      
      // Add breakdown if available
      const breakdowns: string[] = [];
      Object.entries(processedData.aggregations).forEach(([key, value]) => {
        if (key !== 'total_count' && key.includes('_')) {
          const [field, fieldValue] = key.split('_', 2);
          breakdowns.push(`${fieldValue}: ${value}`);
        }
      });
      
      if (breakdowns.length > 0) {
        answer += ` Breakdown: ${breakdowns.join(', ')}.`;
      }

      return { answer, finalAnswerTokens: 0 }; // No AI tokens used
    }

    // For complex queries or when we need natural language generation, use AI with minimal context
    const minimalContext = this.buildMinimalContext(originalQuery, classification, processedData);
    
    const prompt = `Answer this church management question based on the processed data:

Question: "${originalQuery}"
Classification: ${classification.intent} query about ${classification.entities.subject}

Data Summary: ${processedData.summary}
Records Found: ${processedData.metadata.filteredRecords}

${minimalContext}

Provide a clear, helpful answer based on this data. Be specific with numbers and keep the response concise.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 200
    });

    const answer = response.choices[0].message.content || 'I was unable to generate an answer.';
    const finalAnswerTokens = response.usage?.total_tokens || 0;

    return { answer, finalAnswerTokens };
  }

  /**
   * Build minimal context for AI processing
   */
  private buildMinimalContext(
    query: string,
    classification: QueryClassification,
    processedData: ProcessedResponse
  ): string {
    let context = '';

    // Add aggregations if available
    if (processedData.aggregations) {
      const aggEntries = Object.entries(processedData.aggregations)
        .filter(([key]) => key !== 'total_count')
        .map(([key, value]) => `${key}: ${value}`)
        .slice(0, 5); // Limit to top 5 to save tokens
      
      if (aggEntries.length > 0) {
        context += `Aggregations: ${aggEntries.join(', ')}\n`;
      }
    }

    // Add sample data for list/search queries (but only essential fields)
    if ((classification.intent === 'list' || classification.intent === 'search') && 
        processedData.relevantFields.length > 0) {
      const sample = processedData.relevantFields.slice(0, 3); // Only first 3 records
      const essential = sample.map(record => {
        const { id, name, gender, membershipStatus, ...rest } = record;
        return { name: name?.display || name?.first || 'Unknown', gender, membershipStatus };
      });
      context += `Sample records: ${JSON.stringify(essential)}\n`;
    }

    return context;
  }

  /**
   * Estimate tokens used for classification
   */
  private estimateClassificationTokens(query: string): number {
    // Rough estimation: prompt (~300 tokens) + query + response (~100 tokens)
    return 300 + Math.ceil(query.length / 4) + 100;
  }

  /**
   * Estimate tokens saved compared to traditional approach
   */
  private estimateTokensSaved(totalRecords: number): number {
    // Traditional approach would send all raw data to AI
    // Estimate ~50 tokens per record in full context
    const traditionalTokens = Math.min(totalRecords * 50, 8000); // Cap at reasonable limit
    
    // We only send minimal processed context (~100-300 tokens)
    const ourTokens = 200;
    
    return Math.max(traditionalTokens - ourTokens, 0);
  }

  /**
   * Get service statistics
   */
  public getServiceStats(): {
    totalQueries: number;
    averageExecutionTime: number;
    averageTokenUsage: number;
    averageTokensSaved: number;
    confidenceDistribution: Record<string, number>;
  } {
    // This would be implemented with actual tracking in production
    return {
      totalQueries: 0,
      averageExecutionTime: 0,
      averageTokenUsage: 0,
      averageTokensSaved: 0,
      confidenceDistribution: {}
    };
  }
}