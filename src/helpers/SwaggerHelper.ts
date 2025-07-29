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

export interface RouteIndex {
  service: string;
  method: string;
  path: string;
  summary: string;
  tags: string[];
  requiresAuth: boolean;
  permissions: string[];
  routeKey: string;
}

export interface RouteDetails {
  routeKey: string;
  parameters?: any[];
  requestBody?: any;
  responses?: any;
  security?: any[];
  examples?: any[];
  schemas?: Record<string, any>;
  enums?: Record<string, string[]>;
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
  private static readonly ENUMS_CONFIG_PATH = "../../config/enums.json";
  private static allRoutes: RouteInfo[] = [];
  private static apiCollections: ApiRouteCollection[] = [];
  private static enumDefinitions: Record<string, string[]> = {};

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
        swagger: swaggerContent,
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
      if (typeof pathObject === "object" && pathObject !== null) {
        Object.entries(pathObject).forEach(([method, methodObject]) => {
          if (typeof methodObject === "object" && methodObject !== null) {
            const methodData = methodObject as any; // Type assertion for swagger method object
            const route: RouteInfo = {
              apiName,
              path: pathString,
              method: method.toUpperCase(),
              summary: methodData.summary,
              description: methodData.description,
              tags: methodData.tags,
            };
            routes.push(route);
          }
        });
      }
    });

    return routes;
  }

  /**
   * Loads enum definitions from the enums.json file
   * @returns Promise that resolves when enums are loaded
   */
  private static async loadEnumDefinitions(): Promise<void> {
    const enumsPath = path.join(__dirname, this.ENUMS_CONFIG_PATH);

    try {
      const enumsContent = fs.readFileSync(enumsPath, "utf-8");
      this.enumDefinitions = JSON.parse(enumsContent);
      console.log(`Loaded ${Object.keys(this.enumDefinitions).length} enum definitions`);
    } catch (error) {
      console.warn("Could not load enum definitions:", error);
      this.enumDefinitions = {};
    }
  }

  /**
   * Finds enum fields used in schemas
   * @param schemas Object containing schema definitions
   * @returns Record of enum names to their values that are used in the schemas
   */
  private static findUsedEnums(schemas: Record<string, any>): Record<string, string[]> {
    const usedEnums: Record<string, string[]> = {};

    // Check each schema for enum fields
    Object.values(schemas).forEach((schema) => {
      if (schema && typeof schema === "object" && schema.properties) {
        Object.entries(schema.properties).forEach(([fieldName]: [string, any]) => {
          // Check if this field matches any of our enum definitions
          if (this.enumDefinitions[fieldName]) {
            usedEnums[fieldName] = this.enumDefinitions[fieldName];
          }
        });
      }
    });

    return usedEnums;
  }

  /**
   * Loads all swagger files on startup and builds the complete routes array
   * @returns Promise that resolves when all swagger files are loaded
   */
  public static async loadAllSwaggerFiles(): Promise<void> {
    // Load enum definitions first
    await this.loadEnumDefinitions();

    const swaggerDir = path.join(__dirname, this.SWAGGER_CONFIG_PATH);

    try {
      const files = fs.readdirSync(swaggerDir);
      const swaggerFiles = files.filter((file) => file.endsWith(".json"));

      this.allRoutes = [];
      this.apiCollections = [];

      for (const file of swaggerFiles) {
        const apiName = file.replace(".json", "");
        const swaggerResult = await this.readSwaggerFile(apiName);

        if (swaggerResult) {
          const routes = this.parseRoutesFromSwagger(apiName, swaggerResult.swagger);
          this.allRoutes.push(...routes);

          this.apiCollections.push({
            apiName,
            routes,
          });
        }
      }

      console.log(`Loaded ${this.allRoutes.length} routes from ${this.apiCollections.length} APIs`);
    } catch (error) {
      console.error("Error loading swagger files:", error);
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
    const collection = this.apiCollections.find((c) => c.apiName.toLowerCase() === apiName.toLowerCase());
    return collection ? [...collection.routes] : [];
  }

  /**
   * Searches routes by tags, summary, or description
   * @param searchTerm The term to search for
   * @returns Array of matching routes
   */
  public static searchRoutes(searchTerm: string): RouteInfo[] {
    const term = searchTerm.toLowerCase();
    return this.allRoutes.filter(
      (route) =>
        route.summary?.toLowerCase().includes(term) ||
        route.description?.toLowerCase().includes(term) ||
        route.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
        route.path.toLowerCase().includes(term)
    );
  }

  /**
   * Generates a unique route key
   * @param service Service name
   * @param method HTTP method
   * @param path Route path
   * @returns Unique route key
   */
  private static generateRouteKey(service: string, method: string, path: string): string {
    return `${service}.${method}.${path.replace(/[^a-zA-Z0-9]/g, "_")}`;
  }

  /**
   * Extracts permissions from security array
   * @param security Security configuration from swagger
   * @returns Array of permission strings
   */
  private static extractPermissions(security?: any[]): string[] {
    if (!security || !Array.isArray(security)) return [];

    const permissions: string[] = [];
    security.forEach((securityItem) => {
      if (securityItem.permissions && Array.isArray(securityItem.permissions)) {
        permissions.push(...securityItem.permissions);
      }
    });

    return permissions;
  }

  /**
   * Recursively finds all schema references in an object
   * @param obj Object to search for references
   * @param refs Set to collect unique references
   */
  private static findSchemaRefs(obj: any, refs: Set<string>): void {
    if (!obj || typeof obj !== "object") return;

    if (obj.$ref && typeof obj.$ref === "string") {
      const match = obj.$ref.match(/#\/components\/schemas\/(.+)/);
      if (match) {
        refs.add(match[1]);
      }
    }

    if (Array.isArray(obj)) {
      obj.forEach((item) => this.findSchemaRefs(item, refs));
    } else {
      Object.values(obj).forEach((value) => this.findSchemaRefs(value, refs));
    }
  }

  /**
   * Extracts all referenced schemas for a route
   * @param routeData Route data containing parameters, requestBody, responses
   * @param allSchemas All available schemas from swagger
   * @returns Object containing only referenced schemas
   */
  private static extractReferencedSchemas(routeData: any, allSchemas: Record<string, any>): Record<string, any> {
    const refs = new Set<string>();
    const schemas: Record<string, any> = {};

    // Find all refs in route data
    this.findSchemaRefs(routeData.parameters, refs);
    this.findSchemaRefs(routeData.requestBody, refs);
    this.findSchemaRefs(routeData.responses, refs);

    // Process refs recursively to get nested schemas
    const processedRefs = new Set<string>();
    const refsToProcess = Array.from(refs);

    while (refsToProcess.length > 0) {
      const ref = refsToProcess.pop()!;
      if (processedRefs.has(ref)) continue;

      processedRefs.add(ref);

      if (allSchemas[ref]) {
        schemas[ref] = allSchemas[ref];
        // Find nested refs
        const nestedRefs = new Set<string>();
        this.findSchemaRefs(allSchemas[ref], nestedRefs);
        nestedRefs.forEach((nestedRef) => {
          if (!processedRefs.has(nestedRef)) {
            refsToProcess.push(nestedRef);
          }
        });
      }
    }

    return schemas;
  }

  /**
   * Converts swagger routes to optimized route index
   * @returns Array of route index entries
   */
  public static generateRouteIndex(): RouteIndex[] {
    const index: RouteIndex[] = [];

    this.apiCollections.forEach((collection) => {
      collection.routes.forEach((route) => {
        const routeKey = this.generateRouteKey(route.apiName, route.method, route.path);

        index.push({
          service: route.apiName,
          method: route.method,
          path: route.path,
          summary: route.summary || "",
          tags: route.tags || [],
          requiresAuth: true, // Most endpoints require auth in this system
          permissions: [], // Will be populated from detailed swagger data
          routeKey,
        });
      });
    });

    return index;
  }

  /**
   * Extracts detailed route information for specific route
   * @param apiName API name
   * @param path Route path
   * @param method HTTP method
   * @returns Route details or null if not found
   */
  public static async extractRouteDetails(apiName: string, path: string, method: string): Promise<RouteDetails | null> {
    const swaggerResult = await this.readSwaggerFile(apiName);
    if (!swaggerResult?.swagger.paths?.[path]?.[method.toLowerCase()]) {
      return null;
    }

    const methodData = swaggerResult.swagger.paths[path][method.toLowerCase()];
    const routeKey = this.generateRouteKey(apiName, method, path);

    // Extract only the schemas referenced by this route
    const allSchemas = swaggerResult.swagger.components?.schemas || {};
    const referencedSchemas = this.extractReferencedSchemas(methodData, allSchemas);

    // Find enums used in the referenced schemas
    const usedEnums = this.findUsedEnums(referencedSchemas);

    return {
      routeKey,
      parameters: methodData.parameters || [],
      requestBody: methodData.requestBody,
      responses: methodData.responses || {},
      security: methodData.security || [],
      examples: methodData.examples || [],
      schemas: Object.keys(referencedSchemas).length > 0 ? referencedSchemas : undefined,
      enums: Object.keys(usedEnums).length > 0 ? usedEnums : undefined,
    };
  }

  /**
   * Generates optimized files for OpenAI integration
   * @param outputDir Directory to save the optimized files
   */
  public static async generateOptimizedFiles(outputDir: string = "./config/optimized"): Promise<void> {
    await this.loadAllSwaggerFiles();

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate route index (compact format)
    const routeIndex = this.generateRouteIndex();
    fs.writeFileSync(path.join(outputDir, "route-index.json"), JSON.stringify(routeIndex));

    // Generate detailed route files
    const detailsDir = path.join(outputDir, "route-details");
    if (!fs.existsSync(detailsDir)) {
      fs.mkdirSync(detailsDir, { recursive: true });
    }

    let totalSchemas = 0;
    let routesWithSchemas = 0;
    let totalEnums = 0;
    let routesWithEnums = 0;

    for (const collection of this.apiCollections) {
      for (const route of collection.routes) {
        const details = await this.extractRouteDetails(route.apiName, route.path, route.method);
        if (details) {
          const filename = `${details.routeKey}.json`;
          // Write compact JSON (no pretty printing)
          fs.writeFileSync(path.join(detailsDir, filename), JSON.stringify(details));

          if (details.schemas) {
            routesWithSchemas++;
            totalSchemas += Object.keys(details.schemas).length;
          }

          if (details.enums) {
            routesWithEnums++;
            totalEnums += Object.keys(details.enums).length;
          }
        }
      }
    }

    console.log(`Generated optimized files: ${routeIndex.length} routes indexed`);
    console.log(`Routes with schemas: ${routesWithSchemas}/${routeIndex.length}`);
    console.log(`Total unique schemas extracted: ${totalSchemas}`);
    console.log(`Routes with enums: ${routesWithEnums}/${routeIndex.length}`);
    console.log(`Total enum definitions included: ${totalEnums}`);
    console.log(`Details saved to: ${detailsDir}`);
  }
}
