import type { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../services/products.service.js";

/**
 * Manejador de errores centralizado. Express lo reconoce por tener
 * 4 parámetros (err primero) — debe registrarse al final de la cadena.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("💥 Error capturado:", err.message);

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: "Not Found", message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: "Bad Request", message: err.message });
  }

  res.status(500).json({ error: "Internal Server Error", message: err.message });
}