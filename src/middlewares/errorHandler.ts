import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
import { logger } from "../config/logger.js";

/**
 * Manejador de errores centralizado (4 parámetros — así Express lo reconoce
 * como middleware de errores). Debe registrarse al final de la cadena,
 * después de notFound.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Errores de validación de Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation Error",
      issues: err.issues,
    });
  }

  // 2. Errores de aplicación (esperados: 404, 400, etc.)
  if (err instanceof AppError) {
    logger.warn(`${err.statusCode} - ${err.message} - ${req.method} ${req.originalUrl}`);
    return res.status(err.statusCode).json({
      error: err.name === "Error" ? "AppError" : err.name,
      message: err.message,
    });
  }

  // 3. Cualquier otro error no anticipado
  logger.error(`500 - ${err.message} - ${req.method} ${req.originalUrl}`);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
}