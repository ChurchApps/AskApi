import fs from "fs";
import path from "path";

export interface SwaggerContent {
  paths?: Record<string, any>;
  info?: {
    title?: string;
    description?: string;
  };
  [key: string]: any;
}

export interface RouteInfo {
  apiName: string;
  path: string;
  method: string;
  summary?: string;
  description?: string;
  tags?: string[];
}

export interface SwaggerResult {
  availableEndpoints: string[];
  swagger: SwaggerContent;
}

export interface ApiRouteCollection {
  apiName: string;
  routes: RouteInfo[];
}

export class SwaggerHelper {
  private static readonly SWAGGER_CONFIG_PATH = "../../config/swagger";
  private static allRoutes: RouteInfo[] = [];
  private static apiCollections: ApiRouteCollection[] = [];

  /**
   * Reads and parses a swagger JSON file for the specified API
   * @param apiName The name of the API (e.g., "MembershipApi", "AttendanceApi")
   * @returns Promise containing swagger content and available endpoints, or null if file not found
   */
  public static async readSwaggerFile(apiName: string): Promise<SwaggerResult | null> {
    const swaggerPath = path.join(__dirname, this.SWAGGER_CONFIG_PATH, `${apiName.toLowerCase()}.json`);
    
    try {
      const swaggerContent: SwaggerContent = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
      
      return {
        availableEndpoints: Object.keys(swaggerContent.paths || {}),
        swagger: swaggerContent
      };
    } catch (error) {
      console.error(`Could not read swagger file for ${apiName}:`, error);
      return null;
    }
  }

  /**
   * Reads swagger files for multiple APIs
   * @param apiNames Array of API names
   * @returns Record of API names to their swagger results
   */
  public static async readSwaggerFiles(apiNames: string[]): Promise<Record<string, SwaggerResult | { error: string }>> {
    const results: Record<string, SwaggerResult | { error: string }> = {};

    for (const apiName of apiNames) {
      const swaggerResult = await this.readSwaggerFile(apiName);
      
      if (swaggerResult) {
        results[apiName] = swaggerResult;
      } else {
        results[apiName] = { error: `Could not read swagger for ${apiName}` };
      }
    }

    return results;
  }

  /**
   * Gets available endpoints for a specific API
   * @param apiName The name of the API
   * @returns Array of endpoint paths, or empty array if swagger file not found
   */
  public static async getAvailableEndpoints(apiName: string): Promise<string[]> {
    const swaggerResult = await this.readSwaggerFile(apiName);
    return swaggerResult?.availableEndpoints || [];
  }

  /**
   * Parses routes from swagger content
   * @param apiName The name of the API
   * @param swaggerContent The parsed swagger JSON content
   * @returns Array of route information
   */
  private static parseRoutesFromSwagger(apiName: string, swaggerContent: SwaggerContent): RouteInfo[] {
    const routes: RouteInfo[] = [];
    const paths = swaggerContent.paths || {};

    Object.entries(paths).forEach(([pathString, pathObject]) => {
      if (typeof pathObject === 'object' && pathObject !== null) {
        Object.entries(pathObject).forEach(([method, methodObject]) => {
          if (typeof methodObject === 'object' && methodObject !== null) {
            const methodData = methodObject as any; // Type assertion for swagger method object
            const route: RouteInfo = {
              apiName,
              path: pathString,
              method: method.toUpperCase(),
              summary: methodData.summary,
              description: methodData.description,
              tags: methodData.tags
            };
            routes.push(route);
          }
        });
      }
    });

    return routes;
  }

  /**
   * Loads all swagger files on startup and builds the complete routes array
   * @returns Promise that resolves when all swagger files are loaded
   */
  public static async loadAllSwaggerFiles(): Promise<void> {
    const swaggerDir = path.join(__dirname, this.SWAGGER_CONFIG_PATH);
    
    try {
      const files = fs.readdirSync(swaggerDir);
      const swaggerFiles = files.filter(file => file.endsWith('.json'));
      
      this.allRoutes = [];
      this.apiCollections = [];

      for (const file of swaggerFiles) {
        const apiName = file.replace('.json', '');
        const swaggerResult = await this.readSwaggerFile(apiName);
        
        if (swaggerResult) {
          const routes = this.parseRoutesFromSwagger(apiName, swaggerResult.swagger);
          this.allRoutes.push(...routes);
          
          this.apiCollections.push({
            apiName,
            routes
          });
        }
      }

      console.log(`Loaded ${this.allRoutes.length} routes from ${this.apiCollections.length} APIs`);
    } catch (error) {
      console.error('Error loading swagger files:', error);
    }
  }

  /**
   * Gets all loaded routes
   * @returns Array of all route information
   */
  public static getAllRoutes(): RouteInfo[] {
    return [...this.allRoutes];
  }

  /**
   * Gets routes for a specific API
   * @param apiName The name of the API
   * @returns Array of routes for the specified API
   */
  public static getRoutesForApi(apiName: string): RouteInfo[] {
    const collection = this.apiCollections.find(c => c.apiName.toLowerCase() === apiName.toLowerCase());
    return collection ? [...collection.routes] : [];
  }

  /**
   * Searches routes by tags, summary, or description
   * @param searchTerm The term to search for
   * @returns Array of matching routes
   */
  public static searchRoutes(searchTerm: string): RouteInfo[] {
    const term = searchTerm.toLowerCase();
    return this.allRoutes.filter(route => 
      route.summary?.toLowerCase().includes(term) ||
      route.description?.toLowerCase().includes(term) ||
      route.tags?.some(tag => tag.toLowerCase().includes(term)) ||
      route.path.toLowerCase().includes(term)
    );
  }
}