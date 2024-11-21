/**
 * External imports
 */
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

/**
 * Local imports
 */

import initRoutes from "./api/index";
import syncDb from "./models";

/**ss
 * Load environment variables from .env file
 *
 */
dotenv.config();

/**
 * Initialize the express app
 */
const app = express();
const PORT = process.env.PORT;

/**
 * Middleware to parse incoming requests
 */
app.use(express.json());

/**
 * Middleware to compress the response
 */
app.use(compression());

/**
 * Middleware to enable CORS
 */
app.use(cors());

/**
 * Middleware to secure the app by setting various HTTP headers
 */
app.use(helmet());

/**
 * Sync the database
 */
syncDb();

/**
 * Initialize routes
 */
initRoutes(app);

/**
 * Redirect to non-trailing slash URL
 *
 */
app.use((req, res, next) => {
  if (req.path.endsWith("/") && req.path.length > 1) {
    const newPath = req.path.slice(0, -1);
    return res.redirect(301, newPath);
  }
  next();
});

/**
 * Start the server on the specified port
 */
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
