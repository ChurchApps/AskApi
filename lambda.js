import serverlessExpress from "@codegenie/serverless-express";
import { init } from "./dist/src/app.js";
import { Pool } from "@churchapps/apihelper";
import { Environment } from "./dist/src/helpers/Environment.js";

const checkPool = async () => {
  if (!Environment.connectionString) {
    await Environment.init(process.env.APP_ENV);
    Pool.initPool();
  }
};

let handler;

const universal = async function universal(event, context) {
  try {
    await checkPool();

    // Initialize the handler only once
    if (!handler) {
      const app = await init();
      handler = serverlessExpress({
        app,
        binarySettings: {
          contentTypes: ["application/octet-stream", "font/*", "image/*", "application/pdf", "application/zip"]
        },
        stripBasePath: false,
        resolutionMode: "PROMISE"
      });
    }

    return handler(event, context);
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
      },
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};

export { universal };
