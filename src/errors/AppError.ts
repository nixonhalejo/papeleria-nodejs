/**
 * Error de aplicación con status code HTTP explícito.
 * isOperational distingue errores "esperados" (ej. 404, 400) de bugs reales,
 * útil para decidir si el proceso debería reiniciarse en un caso extremo.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Mantiene el stack trace correcto en clases que extienden Error
    Object.setPrototypeOf(this, AppError.prototype);
  }
}