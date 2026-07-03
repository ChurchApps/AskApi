import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  private static readonly ROUTE_EXAMPLES_CONFIG_PATH = "../../config/route-examples.json";
  private static allRoutes: RouteInfo[] = [];
  private static apiCollections: ApiRouteCollection[] = [];
  private static enumDefinitions: Record<string, string[]> = {};
  private static routeExamples: Record<string, any> = {};

  /** Reads and parses a swagger JSON file for the specified API. */
  public static async readSwaggerFile(apiName: string): Promise<SwaggerResult | null> {
    const swaggerPath = path.join(__dirname, this.SWAGGER_CONFIG_PATH, `${apiName.toLowerCase()}.json`);

    try {
      const swaggerContent: SwaggerContent = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

      return { availableEndpoints: Object.keys(swaggerContent.paths || {}), swagger: swaggerContent };
    } catch (error) {
      console.error(`Could not read swagger file for ${apiName}:`, error);
      return null;
    }
  }

  /** Reads swagger files for multiple APIs. */
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

  /** Gets available endpoints for a specific API. */
  public static async getAvailableEndpoints(apiName: string): Promise<string[]> {
    const swaggerResult = await this.readSwaggerFile(apiName);
    return swaggerResult?.availableEndpoints || [];
  }

  /** Parses routes from swagger content. */
  private static parseRoutesFromSwagger(apiName: string, swaggerContent: SwaggerContent): RouteInfo[] {
    const routes: RouteInfo[] = [];
    const paths = swaggerContent.paths || {};

    Object.entries(paths).forEach(([pathString, pathObject]) => {
      if (typeof pathObject === "object" && pathObject !== null) {
        Object.entries(pathObject).forEach(([method, methodObject]) => {
          if (typeof methodObject === "object" && methodObject !== null) {
            const methodData = methodObject as any; // Type assertion for swagger method object
            const route: RouteInfo = { apiName, path: pathString, method: method.toUpperCase(), summary: methodData.summary, description: methodData.description, tags: methodData.tags };
            routes.push(route);
          }
        });
      }
    });

    return routes;
  }

  /** Loads enum definitions from the enums.json file. */
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

  /** Loads route examples from the route-examples.json file. */
  private static async loadRouteExamples(): Promise<void> {
    const examplesPath = path.join(__dirname, this.ROUTE_EXAMPLES_CONFIG_PATH);

    try {
      const examplesContent = fs.readFileSync(examplesPath, "utf-8");
      this.routeExamples = JSON.parse(examplesContent);
      console.log(`Loaded examples for ${Object.keys(this.routeExamples).length} routes`);
    } catch (error) {
      console.warn("Could not load route examples:", error);
      this.routeExamples = {};
    }
  }

  /** Finds enum fields used in schemas. */
  private static findUsedEnums(schemas: Record<string, any>): Record<string, string[]> {
    const usedEnums: Record<string, string[]> = {};

    Object.values(schemas).forEach((schema) => {
      if (schema && typeof schema === "object" && schema.properties) {
        Object.entries(schema.properties).forEach(([fieldName]: [string, any]) => {
          if (this.enumDefinitions[fieldName]) {
            usedEnums[fieldName] = this.enumDefinitions[fieldName];
          }
        });
      }
    });

    return usedEnums;
  }

  /** Loads all swagger files on startup and builds the complete routes array. */
  public static async loadAllSwaggerFiles(): Promise<void> {
    await this.loadEnumDefinitions();
    await this.loadRouteExamples();

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
          this.apiCollections.push({ apiName, routes });
        }
      }

      console.log(`Loaded ${this.allRoutes.length} routes from ${this.apiCollections.length} APIs`);
    } catch (error) {
      console.error("Error loading swagger files:", error);
    }
  }

  /** Gets all loaded routes. */
  public static getAllRoutes(): RouteInfo[] {
    return [...this.allRoutes];
  }

  /** Gets routes for a specific API. */
  public static getRoutesForApi(apiName: string): RouteInfo[] {
    const collection = this.apiCollections.find((c) => c.apiName.toLowerCase() === apiName.toLowerCase());
    return collection ? [...collection.routes] : [];
  }

  /** Searches routes by tags, summary, or description. */
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

  /** Generates a unique route key. */
  private static generateRouteKey(service: string, method: string, path: string): string {
    return `${service}.${method}.${path.replace(/[^a-zA-Z0-9]/g, "_")}`;
  }

  /** Extracts permissions from security array. */
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

  /** Recursively finds all schema references in an object. */
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

  /** Extracts all referenced schemas for a route. */
  private static extractReferencedSchemas(routeData: any, allSchemas: Record<string, any>): Record<string, any> {
    const refs = new Set<string>();
    const schemas: Record<string, any> = {};

    this.findSchemaRefs(routeData.parameters, refs);
    this.findSchemaRefs(routeData.requestBody, refs);
    this.findSchemaRefs(routeData.responses, refs);

    const processedRefs = new Set<string>();
    const refsToProcess = Array.from(refs);

    while (refsToProcess.length > 0) {
      const ref = refsToProcess.pop()!;
      if (processedRefs.has(ref)) continue;

      processedRefs.add(ref);

      if (allSchemas[ref]) {
        schemas[ref] = allSchemas[ref];
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

  /** Converts swagger routes to optimized route index. */
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
          routeKey
        });
      });
    });

    return index;
  }

  /** Extracts detailed route information for specific route. */
  public static async extractRouteDetails(apiName: string, path: string, method: string): Promise<RouteDetails | null> {
    const swaggerResult = await this.readSwaggerFile(apiName);
    if (!swaggerResult?.swagger.paths?.[path]?.[method.toLowerCase()]) {
      return null;
    }

    const methodData = swaggerResult.swagger.paths[path][method.toLowerCase()];
    const routeKey = this.generateRouteKey(apiName, method, path);

    const allSchemas = swaggerResult.swagger.components?.schemas || {};
    const referencedSchemas = this.extractReferencedSchemas(methodData, allSchemas);

    const usedEnums = this.findUsedEnums(referencedSchemas);

    const customExamples = this.routeExamples[routeKey];

    let requestBody = methodData.requestBody;
    if (customExamples && requestBody && requestBody.content && requestBody.content["application/json"]) {
      requestBody = {
        ...requestBody,
        content: {
          ...requestBody.content,
          "application/json": {
            ...requestBody.content["application/json"],
            examples: customExamples.examples
          }
        }
      };
    }

    return {
      routeKey,
      parameters: methodData.parameters || [],
      requestBody: requestBody,
      responses: methodData.responses || {},
      security: methodData.security || [],
      examples: methodData.examples || [],
      schemas: Object.keys(referencedSchemas).length > 0 ? referencedSchemas : undefined,
      enums: Object.keys(usedEnums).length > 0 ? usedEnums : undefined
    };
  }

  /** Generates optimized files for OpenAI integration. */
  public static async generateOptimizedFiles(outputDir: string = "./config/optimized"): Promise<void> {
    await this.loadAllSwaggerFiles();

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const routeIndex = this.generateRouteIndex();
    fs.writeFileSync(path.join(outputDir, "route-index.json"), JSON.stringify(routeIndex));

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
