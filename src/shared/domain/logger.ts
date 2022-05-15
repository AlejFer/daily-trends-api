/**
 * Logger level definition
 */
export type ILoggerLevel = 'info' | 'debug' | 'warn' | 'error';

/**
 * Logger config definition
 */
export type ILoggerConfig = {
  level: string;
};

/**
 * Logger interface
 */
export interface ILogger {
  /**
   * Log message on specified level
   * @param level INFO | DEBUG | WARN | ERROR
   * @param message Message to log
   */
  log(level: ILoggerLevel, message: string): void;

  /**
   * Log on info level
   * @param message Message to log
   */
  info(message: string): void;

  /**
   * Log on debug level
   * @param message Message to log
   */
  debug(message: string): void;

  /**
   * Log on warn level
   * @param message Message to log
   */
  warn(message: string): void;

  /**
   * Log on error level
   * @param message Message to log
   */
  error(message: string): void;
}
