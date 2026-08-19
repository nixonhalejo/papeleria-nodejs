import { createLogger, format, transports } from "winston";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

export const logger = createLogger({
  level: isProduction ? "warn" : "http",
  format: isProduction
    ? format.combine(format.timestamp(), format.json())
    : format.combine(
        format.colorize(),
        format.timestamp({ format: "HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
      ),
  transports: [
    new transports.Console(),
    ...(isProduction ? [new transports.File({ filename: "logs/error.log", level: "error" })] : []),
  ],
});

/** Stream que conecta morgan con winston, para que los logs de peticiones HTTP pasen por el mismo logger. */
export const morganStream = {
  write: (message: string) => logger.http(message.trim()),
};