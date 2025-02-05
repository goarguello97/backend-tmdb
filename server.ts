import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import db from "./config/db";
import routes from "./routes/index.routes";
import { swaggerOptions } from "./swaggerCofig";

const PORT = process.env.PORT || 3001;
const ORIGIN = process.env.ORIGIN;

const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configuración del servidor
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
// Si el entorno es de desarrollo se puede visualizar la documentacion con swagger.
if (process.env.NODE_ENV == "DEV") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.use("/api", routes);

app.get("/api", (req: Request, res: Response) => {
  res.json("Hello World");
});

db.sync({ force: false }).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
});
