import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { sendSlackMessage, sendDeploymentNotification } from "./slack";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // Slack webhook endpoint for deployment notifications
  app.post("/api/slack/deploy", async (req, res) => {
    try {
      const { status, version, details } = req.body;
      const success = await sendDeploymentNotification(status, version, details);
      res.json({ ok: success });
    } catch (error) {
      console.error("[Slack Deploy] Error:", error);
      res.status(500).json({ error: "Failed to send deployment notification" });
    }
  });

  // Generic Slack notification endpoint
  app.post("/api/slack/notify", async (req, res) => {
    try {
      const message = req.body;
      const success = await sendSlackMessage(message);
      res.json({ ok: success });
    } catch (error) {
      console.error("[Slack Notify] Error:", error);
      res.status(500).json({ error: "Failed to send Slack message" });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    // Send deployment notification if configured
    if (process.env.NODE_ENV === "production" && process.env.SLACK_WEBHOOK_URL) {
      sendDeploymentNotification(
        "success",
        process.env.npm_package_version || "unknown",
        `Server started on port ${port}`
      ).catch(err => console.error("[Startup] Failed to send Slack notification:", err));
    }
  });
}

startServer().catch(console.error);
