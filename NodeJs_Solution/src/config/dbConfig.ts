import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

/**
 * MYSQL Database Connection Configuration
 * with sequelize ORM
 */

const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  logging: true,
  port: parseInt(process.env.DB_PORT as string),
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connection has been established successfully.");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
