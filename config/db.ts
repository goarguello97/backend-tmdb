import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config({ path: ".env" });

const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;

// Selecciono distintos host para diferenciar el host en ejecucion local y docker.
const dbHost =
  process.env.NODE_ENV === "DEV"
    ? (process.env.DB_HOST_DEV as string)
    : (process.env.DB_HOST as string);

// Selecciono distintas bases de datos para no afectar la principal, por ejemplo si probamos los endpoint's con swagger.
const dbName =
  process.env.NODE_ENV === "DEV"
    ? (process.env.DB_NAME_DEV as string)
    : (process.env.DB_NAME as string);

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
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
