import { ILoggerLevel } from '../../../shared/domain';
import winston from 'winston';

const consoleLog = new winston.transports.Console()

export function createRequestLogger(logLevel?: ILoggerLevel): winston.Logger {
  const requestLogger = winston.createLogger({
    format: getRequestLogFormatter(),
    transports: [consoleLog],
    level: logLevel,
  })
  return requestLogger;
}

function getRequestLogFormatter(): winston.Logform.Format {
  const {combine, timestamp, printf} = winston.format;

  return combine(
    timestamp(),
    printf(info => {
        return `${info.timestamp} - ${info.level.toUpperCase()}: ${info.message}`;
    })
  );
}
