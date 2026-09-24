import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403, 'Acceso prohibido: Privilegios insuficientes');
    }
    next();
  };
};