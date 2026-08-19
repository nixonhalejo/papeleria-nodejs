import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

/** Middleware para rutas que no coinciden con ninguna definida. Debe ir antes del errorHandler. */
export function notFound(req: Request, res: Response, next: NextFunction) {
  next(new AppError(404, `Ruta ${req.method} ${req.originalUrl} no encontrada.`));
}