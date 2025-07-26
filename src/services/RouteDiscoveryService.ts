import { RouteIndex, RouteDetails } from '../helpers/SwaggerHelper';
import fs from 'fs';
import path from 'path';

/**
 * Route Discovery Service for OpenAI Integration
 * 
 * Provides token-efficient route discovery and on-demand detail loading
 * for enabling OpenAI to query across all microservice APIs.
 */
export class RouteDiscoveryService {
  private static instance: RouteDiscoveryService;
  private routeIndex: RouteIndex[] = [];
  private routeDetailsCache = new Map<string, RouteDetails>();
  private readonly indexPath: string;
  private readonly detailsDir: string;

  private constructor() {
    this.indexPath = path.join(__dirname, '../../config/optimized/route-index.json');
    this.detailsDir = path.join(__dirname, '../../config/optimized/route-details');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): RouteDiscoveryService {
    if (!RouteDiscoveryService.instance) {
      RouteDiscoveryService.instance = new RouteDiscoveryService();
    }
    return RouteDiscoveryService.instance;
  }

  /**
   * Load the route index for OpenAI discovery
   * This should be called once at startup or when routes change
   */
  public async loadRouteIndex(): Promise<void> {
    try {
      if (!fs.existsSync(this.indexPath)) {
        throw new Error('Route index not found. Run "npm run preprocess-swagger" first.');
      }

      const indexData = fs.readFileSync(this.indexPath, 'utf-8');
      this.routeIndex = JSON.parse(indexData);
      
      console.log(`📋 Loaded ${this.routeIndex.length} routes for OpenAI discovery`);
    } catch (error) {
      console.error('❌ Failed to load route index:', error);
      throw error;
    }
  }

  /**
   * Get all routes for OpenAI context (lightweight discovery)
   * This is the main method OpenAI should use for route discovery
   */
  public getRouteIndex(): RouteIndex[] {
    if (this.routeIndex.length === 0) {
      throw new Error('Route index not loaded. Call loadRouteIndex() first.');
    }
    return [...this.routeIndex];
  }

  /**
   * Search routes by natural language query
   * Useful for OpenAI to find relevant routes based on user intent
   */
  public searchRoutes(query: string): RouteIndex[] {
    const searchTerm = query.toLowerCase();
    
    return this.routeIndex.filter(route => 
      route.summary.toLowerCase().includes(searchTerm) ||
      route.path.toLowerCase().includes(searchTerm) ||
      route.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      route.service.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get routes by service (API)
   */
  public getRoutesByService(serviceName: string): RouteIndex[] {
    return this.routeIndex.filter(route => 
      route.service.toLowerCase() === serviceName.toLowerCase()
    );
  }

  /**
   * Get routes by HTTP method
   */
  public getRoutesByMethod(method: string): RouteIndex[] {
    return this.routeIndex.filter(route => 
      route.method.toUpperCase() === method.toUpperCase()
    );
  }

  /**
   * Get routes by tags (e.g., "People", "Attendance Records")
   */
  public getRoutesByTags(tags: string[]): RouteIndex[] {
    return this.routeIndex.filter(route =>
      tags.some(tag => 
        route.tags.some(routeTag => 
          routeTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  /**
   * Load detailed route specification (on-demand)
   * OpenAI should call this when it needs full parameter/response details
   */
  public async getRouteDetails(routeKey: string): Promise<RouteDetails | null> {
    // Check cache first
    if (this.routeDetailsCache.has(routeKey)) {
      return this.routeDetailsCache.get(routeKey)!;
    }

    // Load from file
    const detailPath = path.join(this.detailsDir, `${routeKey}.json`);
    
    try {
      if (!fs.existsSync(detailPath)) {
        console.warn(`⚠️ Route details not found for: ${routeKey}`);
        return null;
      }

      const detailData = fs.readFileSync(detailPath, 'utf-8');
      const details: RouteDetails = JSON.parse(detailData);
      
      // Cache the result
      this.routeDetailsCache.set(routeKey, details);
      
      return details;
    } catch (error) {
      console.error(`❌ Failed to load route details for ${routeKey}:`, error);
      return null;
    }
  }

  /**
   * Generate OpenAI-optimized route summary
   * Returns a condensed view perfect for OpenAI context
   */
  public getOpenAIRouteSummary(): string {
    const serviceGroups = this.groupRoutesByService();
    
    let summary = `Available API Routes (${this.routeIndex.length} total):\n\n`;
    
    Object.entries(serviceGroups).forEach(([service, routes]) => {
      summary += `## ${service} (${routes.length} routes)\n`;
      
      const methodGroups = this.groupRoutesByMethod(routes);
      Object.entries(methodGroups).forEach(([method, methodRoutes]) => {
        summary += `### ${method}\n`;
        methodRoutes.forEach(route => {
          summary += `- ${route.path} - ${route.summary} [${route.routeKey}]\n`;
        });
        summary += '\n';
      });
    });
    
    summary += '\nTo get detailed specifications, use getRouteDetails(routeKey)\n';
    return summary;
  }

  /**
   * Get statistics about available routes
   */
  public getRouteStats(): {
    totalRoutes: number;
    serviceBreakdown: Record<string, number>;
    methodBreakdown: Record<string, number>;
    authRequiredCount: number;
  } {
    const serviceBreakdown: Record<string, number> = {};
    const methodBreakdown: Record<string, number> = {};
    let authRequiredCount = 0;

    this.routeIndex.forEach(route => {
      // Service breakdown
      serviceBreakdown[route.service] = (serviceBreakdown[route.service] || 0) + 1;
      
      // Method breakdown
      methodBreakdown[route.method] = (methodBreakdown[route.method] || 0) + 1;
      
      // Auth count
      if (route.requiresAuth) authRequiredCount++;
    });

    return {
      totalRoutes: this.routeIndex.length,
      serviceBreakdown,
      methodBreakdown,
      authRequiredCount
    };
  }

  /**
   * Clear the route details cache
   */
  public clearCache(): void {
    this.routeDetailsCache.clear();
  }

  // Helper methods
  private groupRoutesByService(): Record<string, RouteIndex[]> {
    return this.routeIndex.reduce((groups, route) => {
      const service = route.service;
      if (!groups[service]) groups[service] = [];
      groups[service].push(route);
      return groups;
    }, {} as Record<string, RouteIndex[]>);
  }

  private groupRoutesByMethod(routes: RouteIndex[]): Record<string, RouteIndex[]> {
    return routes.reduce((groups, route) => {
      const method = route.method;
      if (!groups[method]) groups[method] = [];
      groups[method].push(route);
      return groups;
    }, {} as Record<string, RouteIndex[]>);
  }
}