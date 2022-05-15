import { ILoggerLevel } from '../../../shared/domain';
import winston from 'winston';

const consoleLog = new winston.transports.Console();

/**
 * Create Winston Logger for console transport
 * @param logLevel INFO | DEBUG | WARN | ERROR
 * @returns winston.Logger Logger
 */
export function createRequestLogger(logLevel?: ILoggerLevel): winston.Logger {
  const requestLogger = winston.createLogger({
    format: getRequestLogFormatter(),
    transports: [consoleLog],
    level: logLevel,
  });
  return requestLogger;
}

/**
 * Get the predefine format for a Winston Logger
 * @returns winston.Logform.Format Logger Format
 */
function getRequestLogFormatter(): winston.Logform.Format {
  const { combine, timestamp, printf } = winston.format;

  return combine(
    timestamp(),
    printf((info) => {
      return `${info.timestamp} - ${info.level.toUpperCase()}: ${info.message}`;
    })
  );
}
