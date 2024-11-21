import { type Express } from "express";

import collaboration from "./routes/collaboration.routes";

export default function initRoutes(app: Express): void {
  app.use("/api/v1.0/collaboration-requests", collaboration);
}
