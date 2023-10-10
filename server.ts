import express from "express";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import db from "./config/db";
// import models from "./models/index.js";
import routes from "./routes/index.routes";

// const corsOptions = {
//   origin: process.env.ORIGIN as string,
//   optionsSuccessStatus: 200,
//   //update: or "origin: true," if you don't wanna add a specific one
//   credentials: true,
//   exposedHeaders: ["set-cookie"],
// };

// Configuración del servidor
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", routes);

const PORT = process.env.PORT || 3001;

db.sync({ force: false }).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
});
