import type { Request, Response, NextFunction } from "express";

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
  res.status(500).json({ error: "Error interno del servidor.", detalle: err.message });
}