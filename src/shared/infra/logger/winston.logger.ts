import { Logger } from 'winston';
import { ILogger, ILoggerConfig, ILoggerLevel } from '../../domain';
import { createRequestLogger } from './winston';

/**
 * Winston Logger Implementation
 */
export class WinstonLogger implements ILogger {
  #logger: Logger;

  /**
   * Constructor
   * @param config Config { level: INFO | DEBUG | WARN | ERROR }
   */
  constructor(config: ILoggerConfig) {
    const level: ILoggerLevel = config.level as ILoggerLevel;
    this.#logger = createRequestLogger(level);
  }

  log(level: ILoggerLevel, message: string): void {
    this.#logger.log(level, message);
  }

  info(message: string): void {
    this.#logger.info(message);
  }

  debug(message: string): void {
    this.#logger.debug(message);
  }

  warn(message: string): void {
    this.#logger.warn(message);
  }

  error(message: string): void {
    this.#logger.error(message);
  }
}
