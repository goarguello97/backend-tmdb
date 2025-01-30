import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import db from "./config/db";
import routes from "./routes/index.routes";

const PORT = process.env.PORT || 3001;
const { DB_HOST } = process.env;

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
};

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API tmdb",
      version: "1.0.0",
      description: "Descripción de API tmdb",
    },
    servers: [
      {
        url: `http://${DB_HOST}:${PORT}`, // Cambia esto al puerto que uses en tu app
      },
    ],
  },
  apis: ["./dist/routes/*.js"], // Rutas que quieres documentar (ajusta el path a tus rutas)
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", routes);

app.get("/api", (req: Request, res: Response) => {
  res.json("Hello World");
});

db.sync({ force: false }).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
});
