import type { Request, Response, NextFunction } from "express";

/**
 * Logger personalizado — registra método, ruta y timestamp de cada petición.
 * Distinto de morgan: aquí se ve explícitamente cómo funciona un middleware con next().
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString();
  console.log(`📝 [${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // sin esto, la petición se quedaría "colgada" para siempre
}