import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config({ path: ".env" });

const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;
const dbName = process.env.DB_NAME as string;

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost || "db",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {},
  logging: false,
});

export default db;
