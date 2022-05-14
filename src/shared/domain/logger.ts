export type ILoggerLevel = 'info' | 'debug' | 'warn' | 'error';

export type ILoggerConfig = {
  level: string;
};

export interface ILogger {
  log(level: ILoggerLevel, message: string): void;
  info(message: string): void;
  debug(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}
