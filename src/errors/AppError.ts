/**
 * Error de aplicación con status code HTTP explícito.
 * isOperational distingue errores "esperados" (ej. 404, 400) de bugs reales,
 * útil para decidir si el proceso debería reiniciarse en un caso extremo.
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}