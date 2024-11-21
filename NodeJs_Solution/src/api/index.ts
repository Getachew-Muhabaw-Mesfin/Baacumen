import { type Express } from "express";

import collaboration from "./routes/collaboration.routes";
import users from "./routes/users.routes";

export default function initRoutes(app: Express): void {
  app.use("/api/v1.0/collaboration-requests", collaboration);
  app.use("/api/v1.0/users", users);
}
