import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import helmet from "helmet";
import colors from "colors";
import cors from "cors";
import compression from "compression";
import initRoutes from "./api/index";
import initTables from "./models";

colors.enable();

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(helmet());

initTables();

initRoutes(app);

/**
 * Redirect to non-trailing slash URL
 */
app.use((req, res, next) => {
  if (req.path.endsWith("/") && req.path.length > 1) {
    const newPath = req.path.slice(0, -1);
    return res.redirect(301, newPath);
  }
  next();
});

function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });

    // initializeRolesAndPermissions();
  } catch (error: any) {
    console.error(`Error starting server: ${error.message}`);
  }
}

startServer();

export default app;
