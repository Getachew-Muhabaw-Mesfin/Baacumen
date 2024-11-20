import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import helmet from "helmet";
import colors from "colors";
import cors from "cors";
import compression from "compression";
// import db from "./models/syncmodels";
// import routes from "./routes";

// Enable colors
colors.enable();

dotenv.config();

const app = express();
const PORT = process.env.PORT;

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

// Start server
function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Error starting server: ${error.message}`);
  }
}

startServer();

export default app;
