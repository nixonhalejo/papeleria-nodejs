import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Error de clave duplicada en MongoDB (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'campo';
    res.status(409).json({ error: `El ${field} ingresado ya se encuentra registrado` });
    return;
  }

  // Error de Mongoose para IDs con formato inválido (CastError)
  if (err.name === 'CastError') {
    res.status(400).json({ error: `Formato de ID o valor inválido: ${err.value}` });
    return;
  }

  console.error('💥 Error no controlado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
};