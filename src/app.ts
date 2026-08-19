import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { productsRouter } from "./routes/products.routes.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(requestLogger);

app.use("/api/v1/products", productsRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API Papelería funcionando 🟢" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", message: `Ruta ${req.method} ${req.originalUrl} no encontrada.` });
});

app.use(errorHandler);