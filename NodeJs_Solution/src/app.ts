import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import initializeRolesAndPermissions from "./utils/initializeRolesAndPermissions";
import helmet from "helmet";
import colors from "colors";
import cors from "cors";
import compression from "compression";
import initRoutes from "./api/index";
import initTables from "./config/inittables";

colors.enable();

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(helmet());

initTables();

initRoutes(app);

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
