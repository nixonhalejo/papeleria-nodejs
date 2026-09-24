import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { 
  helmetConfig, 
  corsOptions, 
  globalRateLimiter, 
  authRateLimiter 
} from "./config/security.js";
import { authRouter } from "./routes/auth.routes.js";
import { categoriesRouter } from "./routes/categories.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { morganStream } from "./config/logger.js";

export const app = express();

// Middlewares de Seguridad Global
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(globalRateLimiter);

app.use(cookieParser());
app.use(morgan("dev", { stream: morganStream }));
app.use(express.json());
app.use(requestLogger);

// Endpoint de salud / raíz
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API Papelería funcionando 🟢 con Seguridad Integral" });
});

// Rutas de la API v1 (Auth con Rate Limit estricto)
app.use("/api/v1/auth", authRateLimiter, authRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/products", productsRouter);

// 404 — debe ir DESPUÉS de las rutas, ANTES del errorHandler
app.use(notFound);

// Manejador de errores — SIEMPRE al final de todo
app.use(errorHandler);