import { QueryClassification } from './QueryClassifier';
import { RouteMatch } from './RouteSelector';
import fs from 'fs';
import path from 'path';

export interface ProcessedResponse {
  relevantFields: Record<string, any>[];
  aggregations?: Record<string, number>;
  metadata: {
    totalRecords: number;
    filteredRecords: number;
    fieldsExtracted: string[];
    processingTime: number;
  };
  summary: string;
}

export interface ApiCallResult {
  route: RouteMatch;
  data: any;
  status: 'success' | 'error';
  error?: string;
}

/**
 * DataProcessor - Efficient API response filtering and preprocessing
 * 
 * Processes API responses to extract only relevant data before sending to AI.
 * This minimizes token usage by filtering and aggregating data locally.
 */
export class DataProcessor {
  private static instance: DataProcessor;
  private fieldMetadata: any = null;
  private isInitialized = false;

  // Field extraction rules for different query types
  private static readonly FIELD_EXTRACTION_RULES = {
    // People-related fields
    people: {
      count: ['id', 'name', 'gender', 'membershipStatus', 'maritalStatus'],
      search: ['id', 'name', 'gender', 'membershipStatus', 'maritalStatus', 'email', 'phoneNumber'],
      list: ['id', 'name', 'gender', 'membershipStatus', 'maritalStatus'],
      comparison: ['id', 'name', 'gender', 'birthDate', 'membershipStatus', 'maritalStatus', 'householdId', 'householdRole'],
      aggregate: ['id', 'name', 'gender', 'membershipStatus', 'birthDate']
    },
    
    // Attendance fields
    attendance: {
      count: ['id', 'sessionId', 'personId', 'visitDate'],
      search: ['id', 'sessionId', 'personId', 'visitDate', 'serviceTimeId'],
      list: ['id', 'sessionId', 'personId', 'visitDate'],
      aggregate: ['id', 'visitDate', 'sessionId']
    },
    
    // Donation fields
    donations: {
      count: ['id', 'amount', 'donationDate'],
      search: ['id', 'amount', 'donationDate', 'personId', 'fundId'],
      list: ['id', 'amount', 'donationDate', 'personId'],
      aggregate: ['id', 'amount', 'donationDate']
    }
  };

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): DataProcessor {
    if (!DataProcessor.instance) {
      DataProcessor.instance = new DataProcessor();
    }
    return DataProcessor.instance;
  }

  /**
   * Initialize the data processor
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    // Load field metadata
    try {
      const metadataPath = path.join(__dirname, '../../config/field-metadata.json');
      this.fieldMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    } catch (error) {
      console.warn('⚠️ Could not load field metadata:', error.message);
      this.fieldMetadata = {};
    }
    
    this.isInitialized = true;
    console.log('⚙️ Data Processor initialized');
  }

  /**
   * Process API response data efficiently for the given query
   */
  public async processApiResponse(
    apiResult: ApiCallResult,
    classification: QueryClassification
  ): Promise<ProcessedResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const startTime = Date.now();

    try {
      if (apiResult.status === 'error') {
        return this.createErrorResponse(apiResult.error || 'API call failed', startTime);
      }

      const rawData = apiResult.data;
      if (!rawData) {
        return this.createEmptyResponse(startTime);
      }

      // Determine data category
      const category = this.determineDataCategory(apiResult.route, classification);
      
      // Extract relevant fields
      const relevantFields = this.extractRelevantFields(rawData, category, classification.intent);
      
      // Apply query-specific filtering
      const filteredData = this.applyQueryFiltering(relevantFields, classification);
      
      // Calculate aggregations if needed
      const aggregations = this.calculateAggregations(filteredData, classification);
      
      // Generate summary
      const summary = this.generateDataSummary(filteredData, aggregations, classification);
      
      const processingTime = Date.now() - startTime;

      return {
        relevantFields: filteredData,
        aggregations,
        metadata: {
          totalRecords: Array.isArray(rawData) ? rawData.length : 1,
          filteredRecords: filteredData.length,
          fieldsExtracted: this.getExtractedFieldNames(category, classification.intent),
          processingTime
        },
        summary
      };

    } catch (error) {
      console.error('❌ Error processing API response:', error);
      return this.createErrorResponse(error.message, startTime);
    }
  }

  /**
   * Determine the data category from route and classification
   */
  private determineDataCategory(route: RouteMatch, classification: QueryClassification): string {
    // Check route service
    if (route.route.service === 'membershipapi') {
      return 'people';
    } else if (route.route.service === 'attendanceapi') {
      return 'attendance';
    } else if (route.route.service === 'givingapi') {
      return 'donations';
    }

    // Fallback to classification subject
    const subjectMap: Record<string, string> = {
      'people': 'people',
      'staff': 'people',
      'women': 'people',
      'men': 'people',
      'attendance': 'attendance',
      'donations': 'donations'
    };

    return subjectMap[classification.entities.subject] || 'people';
  }

  /**
   * Extract only relevant fields from raw data
   */
  private extractRelevantFields(rawData: any, category: string, intent: string): Record<string, any>[] {
    if (!Array.isArray(rawData)) {
      // Handle single object
      const extracted = this.extractFieldsFromObject(rawData, category, intent);
      return extracted ? [extracted] : [];
    }

    // Handle array of objects
    return rawData
      .map(item => this.extractFieldsFromObject(item, category, intent))
      .filter(item => item !== null);
  }

  /**
   * Extract relevant fields from a single object
   */
  private extractFieldsFromObject(obj: any, category: string, intent: string): Record<string, any> | null {
    if (!obj || typeof obj !== 'object') {
      return null;
    }

    const rules = DataProcessor.FIELD_EXTRACTION_RULES[category as keyof typeof DataProcessor.FIELD_EXTRACTION_RULES];
    if (!rules) {
      return obj; // No extraction rules, return as-is
    }

    const fieldList = rules[intent as keyof typeof rules] || rules['search'] || Object.keys(obj);
    const extracted: Record<string, any> = {};

    fieldList.forEach((field: string) => {
      if (obj.hasOwnProperty(field)) {
        extracted[field] = obj[field];
      }
    });

    // Always include ID if available
    if (obj.id && !extracted.id) {
      extracted.id = obj.id;
    }

    return extracted;
  }

  /**
   * Apply query-specific filtering to the data
   */
  private applyQueryFiltering(
    data: Record<string, any>[], 
    classification: QueryClassification
  ): Record<string, any>[] {
    let filtered = [...data];

    // Apply entity-based filtering
    const { entities } = classification;
    
    if (entities.attribute && entities.value) {
      filtered = filtered.filter(item => {
        const fieldValue = item[entities.attribute!];
        return this.matchesValue(fieldValue, entities.value!);
      });
    }

    // Apply relationship-based filtering for complex queries
    if (classification.complexity === 'complex' && entities.relationship) {
      filtered = this.applyRelationshipFiltering(filtered, entities);
    }

    return filtered;
  }

  /**
   * Check if a field value matches the expected value
   */
  private matchesValue(fieldValue: any, expectedValue: string): boolean {
    if (!fieldValue) return false;
    
    const fieldStr = String(fieldValue).toLowerCase();
    const expectedStr = expectedValue.toLowerCase();
    
    return fieldStr === expectedStr || fieldStr.includes(expectedStr);
  }

  /**
   * Apply complex relationship-based filtering
   */
  private applyRelationshipFiltering(
    data: Record<string, any>[], 
    entities: QueryClassification['entities']
  ): Record<string, any>[] {
    // This would implement complex relationship logic
    // For now, return the data as-is
    // TODO: Implement household relationship filtering for queries like "oldest wife"
    return data;
  }

  /**
   * Calculate aggregations based on query intent
   */
  private calculateAggregations(
    data: Record<string, any>[], 
    classification: QueryClassification
  ): Record<string, number> | undefined {
    const { intent, entities } = classification;

    if (intent === 'count' || intent === 'aggregate') {
      const aggregations: Record<string, number> = {
        total_count: data.length
      };

      // Gender breakdown for people data
      if (entities.subject === 'people' || entities.subject === 'staff') {
        const genderCounts = this.countByField(data, 'gender');
        Object.assign(aggregations, genderCounts);
        
        const statusCounts = this.countByField(data, 'membershipStatus');
        Object.assign(aggregations, statusCounts);
      }

      // Age calculations if birthDate is available
      if (intent === 'aggregate' && data.some(item => item.birthDate)) {
        const ages = this.calculateAges(data);
        aggregations.average_age = ages.average;
        aggregations.oldest_age = ages.max;
        aggregations.youngest_age = ages.min;
      }

      // Amount calculations for donations
      if (entities.subject === 'donations' && data.some(item => item.amount)) {
        const amounts = data.map(item => parseFloat(item.amount) || 0);
        aggregations.total_amount = amounts.reduce((sum, amount) => sum + amount, 0);
        aggregations.average_amount = aggregations.total_amount / amounts.length;
      }

      return aggregations;
    }

    return undefined;
  }

  /**
   * Count occurrences by field value
   */
  private countByField(data: Record<string, any>[], field: string): Record<string, number> {
    const counts: Record<string, number> = {};
    
    data.forEach(item => {
      const value = item[field];
      if (value) {
        const key = `${field}_${value}`;
        counts[key] = (counts[key] || 0) + 1;
      }
    });

    return counts;
  }

  /**
   * Calculate age statistics from birth dates
   */
  private calculateAges(data: Record<string, any>[]): { average: number; min: number; max: number } {
    const ages = data
      .filter(item => item.birthDate)
      .map(item => {
        const birthDate = new Date(item.birthDate);
        const today = new Date();
        return today.getFullYear() - birthDate.getFullYear();
      })
      .filter(age => age >= 0 && age <= 150); // Reasonable age bounds

    if (ages.length === 0) {
      return { average: 0, min: 0, max: 0 };
    }

    return {
      average: Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length),
      min: Math.min(...ages),
      max: Math.max(...ages)
    };
  }

  /**
   * Generate a summary of the processed data
   */
  private generateDataSummary(
    data: Record<string, any>[], 
    aggregations: Record<string, number> | undefined,
    classification: QueryClassification
  ): string {
    const { intent, entities } = classification;
    const count = data.length;

    if (intent === 'count') {
      if (entities.attribute && entities.value) {
        return `Found ${count} ${entities.subject} with ${entities.attribute}="${entities.value}"`;
      }
      return `Found ${count} ${entities.subject}`;
    }

    if (intent === 'aggregate' && aggregations) {
      const parts: string[] = [`Found ${count} ${entities.subject}`];
      
      if (aggregations.total_amount) {
        parts.push(`totaling $${aggregations.total_amount.toFixed(2)}`);
      }
      
      if (aggregations.average_age) {
        parts.push(`average age ${aggregations.average_age} years`);
      }

      return parts.join(', ');
    }

    if (intent === 'list' || intent === 'search') {
      return `Retrieved ${count} ${entities.subject} records`;
    }

    if (intent === 'comparison') {
      return `Retrieved ${count} ${entities.subject} for comparison analysis`;
    }

    return `Processed ${count} records`;
  }

  /**
   * Get the field names that were extracted
   */
  private getExtractedFieldNames(category: string, intent: string): string[] {
    const rules = DataProcessor.FIELD_EXTRACTION_RULES[category as keyof typeof DataProcessor.FIELD_EXTRACTION_RULES];
    if (!rules) return [];
    
    return rules[intent as keyof typeof rules] || rules['search'] || [];
  }

  /**
   * Create error response
   */
  private createErrorResponse(error: string, startTime: number): ProcessedResponse {
    return {
      relevantFields: [],
      metadata: {
        totalRecords: 0,
        filteredRecords: 0,
        fieldsExtracted: [],
        processingTime: Date.now() - startTime
      },
      summary: `Processing failed: ${error}`
    };
  }

  /**
   * Create empty response
   */
  private createEmptyResponse(startTime: number): ProcessedResponse {
    return {
      relevantFields: [],
      metadata: {
        totalRecords: 0,
        filteredRecords: 0,
        fieldsExtracted: [],
        processingTime: Date.now() - startTime
      },
      summary: 'No data found'
    };
  }

  /**
   * Get processing statistics
   */
  public getProcessingStats(): {
    totalProcessed: number;
    averageProcessingTime: number;
    fieldExtractionStats: Record<string, number>;
  } {
    // This would be implemented with actual tracking in production
    return {
      totalProcessed: 0,
      averageProcessingTime: 0,
      fieldExtractionStats: {}
    };
  }
}