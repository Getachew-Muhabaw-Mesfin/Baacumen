/**
 * External imports
 */
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

/**
 * Local imports
 */

import initRoutes from "./api/index";
import syncDb from "./models";
import { EventDAL } from "./dal/event.dal";

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
 * Schedule the cron job
 * This cron job runs every hour
 */

cron.schedule("0 * * * *", async () => {
  console.log("Running a task every hour to send reminders...");

  try {
    const reminders = await EventDAL.getUpcomingEventsForReminders();

    for (const reminder of reminders) {
      await EventDAL.sendReminderEmail(reminder);
    }

    console.log("All reminders sent successfully.");
  } catch (error) {
    console.error("Error occurred while running the cron job:", error);
  }
});

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
