import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { productsRouter } from "./routes/products.routes.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const app = express();

// Middlewares esenciales
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(requestLogger); // nuestro logger personalizado, además de morgan

// Rutas
app.use("/products", productsRouter);

// Ruta raíz
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API Papelería funcionando 🟢" });
});

// Ruta de prueba para el manejo de errores — dispara un error a propósito
app.get("/error-test", (req: Request, res: Response) => {
  throw new Error("Error de prueba disparado intencionalmente.");
});

// Ruta no encontrada (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no encontrada.` });
});

// Manejador de errores — SIEMPRE al final de todo
app.use(errorHandler);