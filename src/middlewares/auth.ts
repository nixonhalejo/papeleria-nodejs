import type { Request, Response, NextFunction } from "express";

const API_KEY = "papeleria-secret-2026";

/**
 * Autenticación ficticia: exige un header x-api-key para proteger
 * las rutas que modifican datos (POST, PUT, DELETE).
 */
export function fakeAuth(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key");

  if (!key) {
    return res.status(401).json({ error: "Falta el header 'x-api-key'." });
  }

  if (key !== API_KEY) {
    return res.status(403).json({ error: "API key inválida." });
  }

  next();
}