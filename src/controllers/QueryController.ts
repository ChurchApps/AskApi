import { controller, httpPost, httpGet } from "inversify-express-utils";
import express from "express";
import { AskBaseController } from "./AskBaseController";
import { OpenAiHelper, ArrayHelper } from "../helpers";
import { Question } from "../models";
import { OpenAIQueryService } from "../services/OpenAIQueryService";

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
      console.log("=== /query/ask API Request ===");
      console.log("Request payload:", JSON.stringify(req.body, null, 2));
      console.log("Auth info - churchId:", au.churchId, "userId:", au.personId);
      
      const { question, tokens } = req.body;
      console.log("Extracted question:", question);
      console.log("Extracted tokens:", tokens ? Object.keys(tokens) : "No tokens provided");

      try {
        console.log("initializing OpenAI", question);
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
        
        console.log("=== /query/ask API Response ===");
        console.log("Response:", JSON.stringify(response, null, 2));
        console.log("Total processing time:", seconds, "seconds");
        console.log("================================\n");

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
}
