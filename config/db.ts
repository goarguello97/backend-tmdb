import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME as string;

const db = new Sequelize(dbHost, {
  dialect: "postgres",
  // operatorsAliases: false,
  port: 5432,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  ssl: true,
  logging: false,
});

// const db = new Sequelize({
//   dialect: "postgres",
//   host: dbHost,
//   port: 5432,
//   database: dbName,
//   username: dbUser,
//   password: dbPassword,
//   pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
//   dialectOptions: {
//     ssl: { require: true, rejectUnauthorized: false },
//     keepAlive: true,
//   },
//   ssl: true,
// });

export default db;
