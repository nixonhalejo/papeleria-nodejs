import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// 1. Whitelist de orígenes permitidos
const whitelist = [
  'http://localhost:3000',
  'http://localhost:5173', // Para clientes en Vite/React
  process.env.CLIENT_URL || '',
].filter(Boolean);

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (como Postman o curl) o en la whitelist
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por política de CORS'));
    }
  },
  credentials: true, // Permitir envío de cookies (Refresh Token)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// 2. Limitador de peticiones generales (Rate Limiter)
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
  max: 100, // Máximo 100 peticiones por ventana e IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde.',
  },
});

// 3. Limitador estricto para Autenticación (Prevención de Fuerza Bruta)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
  max: 5, // Máximo 5 intentos de login/registro
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Demasiados intentos de autenticación. Intenta de nuevo en 15 minutos.',
  },
});

// 4. Configuración de Helmet
export const helmetConfig = helmet();