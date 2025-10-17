import type { Express } from "express";
import { createServer } from "http";
import { setupHoldingsRoutes } from "./routes/holdings";
import { setupExitPlansRoutes } from "./routes/exitPlans";

export function registerRoutes(app: Express) {
  setupHoldingsRoutes(app);
  setupExitPlansRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
