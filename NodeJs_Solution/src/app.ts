import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import initializeRolesAndPermissions from "./utils/initializeRolesAndPermissions";
import helmet from "helmet";
import colors from "colors";
import cors from "cors";
import compression from "compression";

import db from "./model/syncmodels";
// import routes from "./routes";
import sequelize from "sequelize";

// Enable colors
colors.enable();

dotenv.config();

const app = express();
const PORT = process.env.PORT;

db.sequelize
  .sync
  // { alter: true }
  () // Uncomment the line above to alter the database
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err: any) => {
    console.error("Error syncing database:", err);
  });

// Define CORS options
// const corsOptions = {
//   origin: ["", ""],
//   optionsSuccessStatus: 200,
// };

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(helmet());

// API Routes
// app.use("/api/v1", routes);

// Global Error Handler

/**
 * Start the server
 * Initialize roles and permissions
 * This function will create roles and permissions in the database
 */

function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });

    initializeRolesAndPermissions();
  } catch (error: any) {
    console.error(`Error starting server: ${error.message}`);
  }
}

startServer();

export default app;
