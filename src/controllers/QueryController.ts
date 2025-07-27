import { controller, httpPost, httpGet } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController";
import { OpenAiHelper, ArrayHelper } from "../helpers";
import { Question } from "../models";
import { OpenAIQueryService } from "../services/OpenAIQueryService";
import { EnhancedQueryService } from "../services/EnhancedQueryService";

@controller("/query")
export class QueryController extends AskBaseController {
  /*
  @httpPost("/questions")
  public async queryQuestions(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { text } = req.body;

      if (text && text !== "") {
        OpenAiHelper.initialize();
        // Process the natural language query
        const apiRequestPrompt = await OpenAiHelper.buildPrompt(text);
        const aiResponse = await OpenAiHelper.getCompletion(apiRequestPrompt);


      }
    });
  }*/






  @httpPost("/ask")
  public async askQuestion(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question, tokens } = req.body;

      try {
        // Initialize OpenAI
        await OpenAiHelper.initialize();

        // Get subdomain and site URL from request
        //const subDomain = req.headers["x-subdomain"] as string || "";
        //const siteUrl = req.headers["referer"] as string || "";

        // Call OpenAI to process the question
        const result = await OpenAiHelper.askQuestion(question, tokens || {});

        // Calculate duration in seconds
        const seconds = (result.endTime - result.startTime) / 1000;

        // Create question record for logging
        const questionRecord: Question = {
          churchId: au.churchId,
          userId: au.personId,
          question: question,
          answer: result.answer,
          dateAnswered: new Date(),
          inputTokens: result.inputTokens,
          cachedInputTokens: result.cachedInputTokens,
          outputTokens: result.outputTokens,
          seconds: seconds
        };

        // Save to database
        await this.repositories.question.save(questionRecord);

        const response = {
          answer: result.answer,
          questionId: questionRecord.id,
          tokensUsed: {
            input: result.inputTokens,
            cachedInput: result.cachedInputTokens,
            output: result.outputTokens
          },
          processingTime: seconds
        };
        

        // Return the answer
        return response;
      } catch (error) {
        console.error("Error processing question:", error);
        return res.status(500).json({
          error: "Failed to process question",
          details: error.message
        });
      }
    });
  }

  @httpPost("/discover-routes")
  public async discoverRoutes(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { query } = req.body;

      if (!query || typeof query !== 'string') {
        return res.status(400).json({
          error: "Query parameter is required and must be a string"
        });
      }

      try {
        const queryService = OpenAIQueryService.getInstance();
        
        const result = await queryService.processQuery(query, {
          churchId: au.churchId,
          userId: au.personId,
          permissions: [] // TODO: Extract from au if needed
        });

        return {
          intent: result.intent,
          routes: result.selectedRoutes,
          apiCall: result.apiCall,
          explanation: result.explanation,
          confidence: result.confidence
        };
      } catch (error) {
        console.error("Error discovering routes:", error);
        return res.status(500).json({
          error: "Failed to discover routes",
          details: error.message
        });
      }
    });
  }

  @httpGet("/available-routes")
  public async getAvailableRoutes(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      try {
        const queryService = OpenAIQueryService.getInstance();
        await queryService.initialize();

        const routes = queryService.getAllRoutes();
        const stats = queryService.getStats();

        return {
          routes,
          stats,
          totalRoutes: routes.length
        };
      } catch (error) {
        console.error("Error getting available routes:", error);
        return res.status(500).json({
          error: "Failed to get available routes",
          details: error.message
        });
      }
    });
  }

  @httpPost("/search-routes")
  public async searchRoutes(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { searchTerm } = req.body;

      if (!searchTerm || typeof searchTerm !== 'string') {
        return res.status(400).json({
          error: "searchTerm parameter is required and must be a string"
        });
      }

      try {
        const queryService = OpenAIQueryService.getInstance();
        await queryService.initialize();

        const routes = queryService.searchRoutes(searchTerm);

        return {
          routes,
          count: routes.length,
          searchTerm
        };
      } catch (error) {
        console.error("Error searching routes:", error);
        return res.status(500).json({
          error: "Failed to search routes",
          details: error.message
        });
      }
    });
  }

  @httpGet("/stats")
  public async getStats(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      try {
        const queryService = OpenAIQueryService.getInstance();
        await queryService.initialize();

        const stats = queryService.getStats();

        return stats;
      } catch (error) {
        console.error("Error getting stats:", error);
        return res.status(500).json({
          error: "Failed to get stats",
          details: error.message
        });
      }
    });
  }

  @httpPost("/enhanced-ask")
  public async enhancedAsk(req: express.Request<{}, {}, any>, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      const { question, tokens } = req.body;

      if (!question || typeof question !== 'string') {
        return res.status(400).json({
          error: "Question parameter is required and must be a string"
        });
      }

      if (!tokens || typeof tokens !== 'object') {
        return res.status(400).json({
          error: "Tokens parameter is required and must be an object with API tokens"
        });
      }

      try {
        const enhancedQueryService = EnhancedQueryService.getInstance();
        
        const result = await enhancedQueryService.executeQuery(question, {
          churchId: au.churchId,
          userId: au.personId,
          tokens: tokens
        });

        // Create question record for logging
        const questionRecord: Question = {
          churchId: au.churchId,
          userId: au.personId,
          question: question,
          answer: result.answer,
          dateAnswered: new Date(),
          inputTokens: result.tokenUsage.totalTokens,
          cachedInputTokens: 0, // Enhanced system doesn't use cached tokens in same way
          outputTokens: result.tokenUsage.finalAnswerTokens,
          seconds: result.execution.totalTime / 1000
        };

        // Save to database
        await this.repositories.question.save(questionRecord);

        const response = {
          answer: result.answer,
          questionId: questionRecord.id,
          enhanced: {
            classification: result.classification,
            routeSelection: {
              primaryRoute: result.routeSelection.primaryRoute.route,
              confidence: result.routeSelection.primaryRoute.confidence,
              reason: result.routeSelection.primaryRoute.reason
            },
            dataProcessing: {
              totalRecords: result.processedData.metadata.totalRecords,
              filteredRecords: result.processedData.metadata.filteredRecords,
              fieldsExtracted: result.processedData.metadata.fieldsExtracted
            },
            execution: result.execution,
            tokenUsage: result.tokenUsage,
            confidence: result.confidence
          },
          // Legacy format for compatibility
          tokensUsed: {
            input: result.tokenUsage.totalTokens - result.tokenUsage.finalAnswerTokens,
            cachedInput: 0,
            output: result.tokenUsage.finalAnswerTokens
          },
          processingTime: result.execution.totalTime / 1000
        };

        return response;
      } catch (error) {
        console.error("Error processing enhanced question:", error);
        return res.status(500).json({
          error: "Failed to process enhanced question",
          details: error.message
        });
      }
    });
  }

  @httpGet("/enhanced-stats")
  public async getEnhancedStats(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      try {
        const enhancedQueryService = EnhancedQueryService.getInstance();
        await enhancedQueryService.initialize();

        const stats = enhancedQueryService.getServiceStats();

        return {
          enhancedQueryStats: stats,
          message: "Enhanced query execution statistics"
        };
      } catch (error) {
        console.error("Error getting enhanced stats:", error);
        return res.status(500).json({
          error: "Failed to get enhanced stats",
          details: error.message
        });
      }
    });
  }
}
