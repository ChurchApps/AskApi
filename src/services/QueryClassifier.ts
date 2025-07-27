import { OpenAI } from 'openai';
import { Environment } from '../helpers/Environment';

export interface QueryClassification {
  intent: 'count' | 'search' | 'comparison' | 'aggregate' | 'list';
  entities: {
    subject: string; // 'staff', 'women', 'men', 'people', 'donations', etc.
    attribute?: string; // 'membershipStatus', 'gender', 'maritalStatus', etc.
    filter?: string; // 'oldest', 'youngest', 'highest', 'lowest', etc.
    relationship?: string; // 'wife', 'husband', 'spouse', etc.
    value?: string; // specific filter values like 'Staff', 'Female', etc.
  };
  complexity: 'simple' | 'complex';
  confidence: number;
}

/**
 * QueryClassifier - Lightweight AI-powered query understanding
 * 
 * Extracts intent and entities from natural language queries using minimal tokens.
 * This is the first phase of the enhanced query execution system.
 */
export class QueryClassifier {
  private static instance: QueryClassifier;
  private openai: OpenAI;
  private isInitialized = false;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: Environment.openAiApiKey
    });
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): QueryClassifier {
    if (!QueryClassifier.instance) {
      QueryClassifier.instance = new QueryClassifier();
    }
    return QueryClassifier.instance;
  }

  /**
   * Initialize the classifier
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    if (!Environment.openAiApiKey) {
      throw new Error('OpenAI API key not configured');
    }
    
    this.isInitialized = true;
    console.log('🔍 Query Classifier initialized');
  }

  /**
   * Classify a natural language query to extract intent and entities
   * Uses a lightweight model and minimal context for token efficiency
   */
  public async classifyQuery(query: string): Promise<QueryClassification> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const classification = await this.performClassification(query);
      
      // Validate and normalize the classification
      return this.normalizeClassification(classification, query);
    } catch (error) {
      console.error('❌ Error in query classification:', error);
      // Return a safe fallback classification
      return this.createFallbackClassification(query);
    }
  }

  /**
   * Perform the actual classification using OpenAI
   */
  private async performClassification(query: string): Promise<any> {
    const prompt = `Analyze this church management query and classify it precisely.

Query: "${query}"

Extract the following information:

1. INTENT (exactly one):
   - "count": asking how many (e.g., "how many staff", "count of members")
   - "search": looking for specific records (e.g., "find John", "show me visitors")
   - "list": wanting to see a list (e.g., "list all women", "show staff members")
   - "comparison": comparing entities (e.g., "oldest wife", "youngest member")
   - "aggregate": calculations (e.g., "total donations", "average age")

2. ENTITIES:
   - subject: main entity being queried (people, staff, women, men, donations, attendance, etc.)
   - attribute: field to filter on (gender, membershipStatus, maritalStatus, age, etc.)
   - filter: comparison filter (oldest, youngest, highest, lowest, etc.)
   - relationship: family relationship (wife, husband, spouse, child, etc.)
   - value: specific value to match (Staff, Female, Male, Married, etc.)

3. COMPLEXITY:
   - "simple": single entity, straightforward query
   - "complex": multiple entities, relationships, or complex logic

IMPORTANT: 
- Be precise with subject extraction (staff=membershipStatus filter, women=gender filter)
- Extract specific values from the query text
- For "how many X", intent is "count"
- For "which/who", intent is usually "search" or "comparison"

Respond with ONLY this JSON format:
{
  "intent": "count|search|list|comparison|aggregate",
  "entities": {
    "subject": "string",
    "attribute": "string or null",
    "filter": "string or null", 
    "relationship": "string or null",
    "value": "string or null"
  },
  "complexity": "simple|complex",
  "confidence": 0.0-1.0
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 200,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content || '{}';
    return JSON.parse(content);
  }

  /**
   * Normalize and validate the classification result
   */
  private normalizeClassification(classification: any, originalQuery: string): QueryClassification {
    // Ensure all required fields exist with defaults
    const normalized: QueryClassification = {
      intent: this.normalizeIntent(classification.intent),
      entities: {
        subject: classification.entities?.subject || 'people',
        attribute: classification.entities?.attribute || null,
        filter: classification.entities?.filter || null,
        relationship: classification.entities?.relationship || null,
        value: classification.entities?.value || null
      },
      complexity: classification.complexity === 'complex' ? 'complex' : 'simple',
      confidence: Math.min(Math.max(classification.confidence || 0.5, 0), 1)
    };

    // Apply domain-specific normalizations
    this.applyDomainNormalizations(normalized, originalQuery);

    return normalized;
  }

  /**
   * Normalize intent values to valid enum
   */
  private normalizeIntent(intent: string): QueryClassification['intent'] {
    const validIntents: QueryClassification['intent'][] = ['count', 'search', 'comparison', 'aggregate', 'list'];
    const normalized = intent?.toLowerCase();
    
    if (validIntents.includes(normalized as any)) {
      return normalized as QueryClassification['intent'];
    }
    
    // Default fallback logic
    return 'search';
  }

  /**
   * Apply church management domain-specific normalizations
   */
  private applyDomainNormalizations(classification: QueryClassification, query: string): void {
    const queryLower = query.toLowerCase();
    
    // Subject-specific attribute mapping
    if (classification.entities.subject === 'staff' || queryLower.includes('staff')) {
      classification.entities.subject = 'people';
      classification.entities.attribute = 'membershipStatus';
      classification.entities.value = 'Staff';
    }
    
    if (classification.entities.subject === 'women' || queryLower.includes('women')) {
      classification.entities.subject = 'people';
      classification.entities.attribute = 'gender';
      classification.entities.value = 'Female';
    }
    
    if (classification.entities.subject === 'men' || queryLower.includes('men')) {
      classification.entities.subject = 'people';
      classification.entities.attribute = 'gender';
      classification.entities.value = 'Male';
    }

    // Attribute normalization
    const attributeMap: Record<string, string> = {
      'membership': 'membershipStatus',
      'sex': 'gender',
      'marital': 'maritalStatus',
      'birth': 'birthDate',
      'age': 'birthDate'
    };

    if (classification.entities.attribute) {
      for (const [key, value] of Object.entries(attributeMap)) {
        if (classification.entities.attribute.toLowerCase().includes(key)) {
          classification.entities.attribute = value;
          break;
        }
      }
    }

    // Value normalization
    const valueMap: Record<string, string> = {
      'female': 'Female',
      'male': 'Male',
      'married': 'Married',
      'single': 'Single',
      'staff': 'Staff',
      'member': 'Member',
      'guest': 'Guest',
      'visitor': 'Guest'
    };

    if (classification.entities.value) {
      const normalizedValue = valueMap[classification.entities.value.toLowerCase()];
      if (normalizedValue) {
        classification.entities.value = normalizedValue;
      }
    }

    // Complexity adjustment based on relationships
    if (classification.entities.relationship || classification.entities.filter) {
      classification.complexity = 'complex';
    }
  }

  /**
   * Create a fallback classification when AI processing fails
   */
  private createFallbackClassification(query: string): QueryClassification {
    const queryLower = query.toLowerCase();
    
    let intent: QueryClassification['intent'] = 'search';
    if (queryLower.includes('how many') || queryLower.includes('count')) {
      intent = 'count';
    } else if (queryLower.includes('list') || queryLower.includes('show')) {
      intent = 'list';
    } else if (queryLower.includes('oldest') || queryLower.includes('youngest')) {
      intent = 'comparison';
    }

    return {
      intent,
      entities: {
        subject: 'people'
      },
      complexity: 'simple',
      confidence: 0.3 // Low confidence for fallback
    };
  }

  /**
   * Get classification statistics for monitoring
   */
  public getClassificationStats(): {
    totalClassifications: number;
    averageConfidence: number;
    intentDistribution: Record<string, number>;
  } {
    // This would be implemented with actual tracking in production
    return {
      totalClassifications: 0,
      averageConfidence: 0,
      intentDistribution: {}
    };
  }
}