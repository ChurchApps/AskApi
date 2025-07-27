import { QueryClassification } from './QueryClassifier';
import { RouteIndex } from '../helpers/SwaggerHelper';
import { RouteDiscoveryService } from './RouteDiscoveryService';

export interface RouteMatch {
  route: RouteIndex;
  confidence: number;
  parameters: Record<string, any>;
  reason: string;
  priority: number;
}

export interface RouteSelectionResult {
  primaryRoute: RouteMatch;
  alternativeRoutes: RouteMatch[];
  selectionStrategy: string;
  totalCandidates: number;
}

/**
 * RouteSelector - Rule-based API route selection
 * 
 * Maps query classifications to specific API routes using deterministic rules.
 * This avoids token usage by using pre-defined routing logic instead of AI.
 */
export class RouteSelector {
  private static instance: RouteSelector;
  private routeDiscovery: RouteDiscoveryService;
  private isInitialized = false;

  // Rule-based route selection matrix
  private static readonly ROUTE_SELECTION_RULES = {
    // People-related queries
    'count_people': ['membershipapi.GET._people'],
    'search_people': ['membershipapi.GET._people_search', 'membershipapi.GET._people'],
    'list_people': ['membershipapi.GET._people'],
    'comparison_people': ['membershipapi.GET._people'],
    'aggregate_people': ['membershipapi.GET._people'],

    // Attendance queries
    'count_attendance': ['attendanceapi.GET._attendancerecords', 'attendanceapi.GET._visits'],
    'search_attendance': ['attendanceapi.GET._attendancerecords_search', 'attendanceapi.GET._attendancerecords'],
    'list_attendance': ['attendanceapi.GET._attendancerecords'],
    'aggregate_attendance': ['attendanceapi.GET._attendancerecords_trend'],

    // Giving/donations queries
    'count_donations': ['givingapi.GET._donations'],
    'search_donations': ['givingapi.GET._donations'],
    'list_donations': ['givingapi.GET._donations'],
    'aggregate_donations': ['givingapi.GET._donations_summary', 'givingapi.GET._donations'],

    // Groups queries
    'count_groups': ['membershipapi.GET._groups'],
    'search_groups': ['membershipapi.GET._groups'],
    'list_groups': ['membershipapi.GET._groups'],

    // Default fallbacks
    'default_people': ['membershipapi.GET._people'],
    'default_search': ['membershipapi.GET._people_search']
  };

  private constructor() {
    this.routeDiscovery = RouteDiscoveryService.getInstance();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): RouteSelector {
    if (!RouteSelector.instance) {
      RouteSelector.instance = new RouteSelector();
    }
    return RouteSelector.instance;
  }

  /**
   * Initialize the route selector
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    await this.routeDiscovery.loadRouteIndex();
    this.isInitialized = true;
    
    console.log('🎯 Route Selector initialized');
  }

  /**
   * Select the best API route(s) for a classified query
   */
  public async selectRoutes(classification: QueryClassification): Promise<RouteSelectionResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Generate rule key for route lookup
      const ruleKey = this.generateRuleKey(classification);
      
      // Get candidate routes using rules
      const candidateRoutes = this.getCandidateRoutes(ruleKey, classification);
      
      // Score and rank routes
      const scoredRoutes = this.scoreRoutes(candidateRoutes, classification);
      
      // Return the best match with alternatives
      return this.buildSelectionResult(scoredRoutes, ruleKey, candidateRoutes.length);
      
    } catch (error) {
      console.error('❌ Error in route selection:', error);
      return this.createFallbackSelection(classification);
    }
  }

  /**
   * Generate a rule key for route selection matrix lookup
   */
  private generateRuleKey(classification: QueryClassification): string {
    const { intent, entities } = classification;
    
    // Map subjects to route categories
    const subjectCategory = this.mapSubjectToCategory(entities.subject);
    
    return `${intent}_${subjectCategory}`;
  }

  /**
   * Map query subjects to API categories
   */
  private mapSubjectToCategory(subject: string): string {
    const categoryMap: Record<string, string> = {
      'people': 'people',
      'staff': 'people',
      'members': 'people',
      'women': 'people',
      'men': 'people',
      'attendance': 'attendance',
      'visits': 'attendance',
      'sessions': 'attendance',
      'donations': 'donations',
      'giving': 'donations',
      'funds': 'donations',
      'groups': 'groups',
      'households': 'people'
    };

    const normalized = subject?.toLowerCase() || 'people';
    return categoryMap[normalized] || 'people';
  }

  /**
   * Get candidate routes based on rule key
   */
  private getCandidateRoutes(ruleKey: string, classification: QueryClassification): RouteIndex[] {
    const allRoutes = this.routeDiscovery.getRouteIndex();
    
    // First try exact rule match
    let routeKeys = RouteSelector.ROUTE_SELECTION_RULES[ruleKey as keyof typeof RouteSelector.ROUTE_SELECTION_RULES];
    
    // Fallback to category-based selection
    if (!routeKeys || routeKeys.length === 0) {
      const category = this.mapSubjectToCategory(classification.entities.subject);
      const fallbackKey = `default_${category}` as keyof typeof RouteSelector.ROUTE_SELECTION_RULES;
      routeKeys = RouteSelector.ROUTE_SELECTION_RULES[fallbackKey] || RouteSelector.ROUTE_SELECTION_RULES['default_people'];
    }

    // Find matching routes
    const candidates: RouteIndex[] = [];
    routeKeys.forEach((routeKey: string) => {
      const route = allRoutes.find(r => r.routeKey === routeKey);
      if (route) {
        candidates.push(route);
      }
    });

    // If still no matches, find routes by service and method
    if (candidates.length === 0) {
      const category = this.mapSubjectToCategory(classification.entities.subject);
      const serviceMap: Record<string, string> = {
        'people': 'membershipapi',
        'attendance': 'attendanceapi',
        'donations': 'givingapi',
        'groups': 'membershipapi'
      };
      
      const targetService = serviceMap[category] || 'membershipapi';
      const serviceRoutes = allRoutes.filter(r => 
        r.service === targetService && r.method === 'GET'
      );
      
      candidates.push(...serviceRoutes.slice(0, 3)); // Limit to top 3
    }

    return candidates;
  }

  /**
   * Score routes based on classification match
   */
  private scoreRoutes(routes: RouteIndex[], classification: QueryClassification): RouteMatch[] {
    return routes.map(route => {
      const score = this.calculateRouteScore(route, classification);
      const parameters = this.generateRouteParameters(route, classification);
      const reason = this.generateSelectionReason(route, classification);
      
      return {
        route,
        confidence: score.confidence,
        parameters,
        reason,
        priority: score.priority
      };
    }).sort((a, b) => {
      // Sort by priority first, then confidence
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return b.confidence - a.confidence;
    });
  }

  /**
   * Calculate route score based on classification match
   */
  private calculateRouteScore(route: RouteIndex, classification: QueryClassification): {
    confidence: number;
    priority: number;
  } {
    let confidence = 0.5; // Base confidence
    let priority = 1; // Base priority

    // Service matching
    const category = this.mapSubjectToCategory(classification.entities.subject);
    const expectedService = this.getExpectedService(category);
    if (route.service === expectedService) {
      confidence += 0.3;
      priority += 2;
    }

    // Intent-based scoring
    switch (classification.intent) {
      case 'count':
      case 'aggregate':
        // Prefer GET endpoints that return lists
        if (route.method === 'GET' && !route.path.includes('/{id}')) {
          confidence += 0.2;
          priority += 1;
        }
        break;
      
      case 'search':
        // Prefer search endpoints
        if (route.path.includes('search')) {
          confidence += 0.3;
          priority += 2;
        } else if (route.method === 'GET') {
          confidence += 0.1;
        }
        break;
      
      case 'list':
        // Prefer list endpoints
        if (route.method === 'GET' && !route.path.includes('/{id}') && !route.path.includes('search')) {
          confidence += 0.2;
          priority += 1;
        }
        break;
      
      case 'comparison':
        // Need full data access for comparisons
        if (route.method === 'GET' && !route.path.includes('/{id}')) {
          confidence += 0.2;
          priority += 1;
        }
        break;
    }

    // Complexity penalty for complex queries on simple endpoints
    if (classification.complexity === 'complex' && route.path.includes('summary')) {
      confidence -= 0.1;
    }

    // Ensure bounds
    confidence = Math.min(Math.max(confidence, 0), 1);
    
    return { confidence, priority };
  }

  /**
   * Get expected service for a category
   */
  private getExpectedService(category: string): string {
    const serviceMap: Record<string, string> = {
      'people': 'membershipapi',
      'attendance': 'attendanceapi',
      'donations': 'givingapi',
      'groups': 'membershipapi'
    };
    
    return serviceMap[category] || 'membershipapi';
  }

  /**
   * Generate route parameters based on classification
   */
  private generateRouteParameters(route: RouteIndex, classification: QueryClassification): Record<string, any> {
    const parameters: Record<string, any> = {};

    // Add filtering parameters for advanced search endpoints
    if (route.path.includes('advancedSearch') || route.path.includes('search')) {
      const conditions = this.buildSearchConditions(classification);
      if (conditions.length > 0) {
        parameters.body = conditions;
      }
    }

    // Add query parameters for GET endpoints
    if (route.method === 'GET') {
      // Add any relevant query parameters based on the route definition
      // This would be enhanced with actual route parameter definitions
    }

    return parameters;
  }

  /**
   * Build search conditions from classification
   */
  private buildSearchConditions(classification: QueryClassification): any[] {
    const conditions: any[] = [];
    const { entities } = classification;

    // Add attribute-based conditions
    if (entities.attribute && entities.value) {
      conditions.push({
        field: entities.attribute,
        value: entities.value,
        operator: 'equals'
      });
    }

    return conditions;
  }

  /**
   * Generate human-readable selection reason
   */
  private generateSelectionReason(route: RouteIndex, classification: QueryClassification): string {
    const intent = classification.intent;
    const subject = classification.entities.subject;
    
    if (route.path.includes('search')) {
      return `Selected search endpoint for ${intent} query on ${subject}`;
    }
    
    if (route.path.includes('summary')) {
      return `Selected summary endpoint for ${intent} query on ${subject}`;
    }
    
    return `Selected ${route.method} ${route.path} for ${intent} query on ${subject}`;
  }

  /**
   * Build the final selection result
   */
  private buildSelectionResult(
    scoredRoutes: RouteMatch[], 
    strategy: string, 
    totalCandidates: number
  ): RouteSelectionResult {
    if (scoredRoutes.length === 0) {
      throw new Error('No routes found for query');
    }

    return {
      primaryRoute: scoredRoutes[0],
      alternativeRoutes: scoredRoutes.slice(1, 3), // Top 2 alternatives
      selectionStrategy: strategy,
      totalCandidates
    };
  }

  /**
   * Create fallback selection when normal selection fails
   */
  private createFallbackSelection(classification: QueryClassification): RouteSelectionResult {
    const allRoutes = this.routeDiscovery.getRouteIndex();
    
    // Find a safe fallback route (people endpoint)
    const fallbackRoute = allRoutes.find(r => 
      r.service === 'membershipapi' && 
      r.method === 'GET' && 
      r.path === '/people'
    );

    if (!fallbackRoute) {
      throw new Error('No fallback route available');
    }

    const fallbackMatch: RouteMatch = {
      route: fallbackRoute,
      confidence: 0.3,
      parameters: {},
      reason: 'Fallback selection due to error in route matching',
      priority: 1
    };

    return {
      primaryRoute: fallbackMatch,
      alternativeRoutes: [],
      selectionStrategy: 'fallback',
      totalCandidates: 1
    };
  }

  /**
   * Get route selection statistics
   */
  public getSelectionStats(): {
    totalSelections: number;
    averageConfidence: number;
    strategyDistribution: Record<string, number>;
  } {
    // This would be implemented with actual tracking in production
    return {
      totalSelections: 0,
      averageConfidence: 0,
      strategyDistribution: {}
    };
  }
}