import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { authRouter } from "./routes/auth.routes.js";
import { categoriesRouter } from "./routes/categories.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { morganStream } from "./config/logger.js";

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("dev", { stream: morganStream }));
app.use(express.json());
app.use(requestLogger);

// Endpoint de salud / raíz
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API Papelería funcionando 🟢" });
});

// Rutas de la API v1
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);

// 404 — debe ir DESPUÉS de las rutas, ANTES del errorHandler
app.use(notFound);

// Manejador de errores — SIEMPRE al final de todo
app.use(errorHandler);