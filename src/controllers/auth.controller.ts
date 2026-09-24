import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const service = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = registerSchema.parse(req.body);
      const user = await service.register(validated as any);
      res.status(201).json(user);
    } catch (err) { next(err); }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await service.login(validated.email, validated.password);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (err) { next(err); }
  }
}