import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { productsRouter } from "./routes/products.routes.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { morganStream } from "./config/logger.js";

export const app = express();

app.use(cors());
app.use(morgan("dev", { stream: morganStream }));
app.use(express.json());
app.use(requestLogger);

app.use("/api/v1/products", productsRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API Papelería funcionando 🟢" });
});

// 404 — debe ir DESPUÉS de las rutas, ANTES del errorHandler
app.use(notFound);

// Manejador de errores — SIEMPRE al final de todo
app.use(errorHandler);