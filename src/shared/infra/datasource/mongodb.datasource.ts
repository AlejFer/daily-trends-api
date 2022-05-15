import mongoose from 'mongoose';
import { Datasource, ILogger } from '../../domain';

/**
 * Mongo config definition
 */
type IMongoConfig = {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
};

/**
 * Mongoose type definition
 */
export type Mongoose = mongoose.Mongoose;

/**
 * Mongo Datasource Implementation
 */
export class MongoDatasource implements Datasource<Mongoose> {
  #config: IMongoConfig;
  #logger: ILogger;
  client: Mongoose | undefined;

  /**
   * Constructor
   * @param config Datasource config
   * @param logger Logger
   */
  constructor(config: IMongoConfig, logger: ILogger) {
    this.#config = config;
    this.#logger = logger;
  }

  public async init() {
    try {
      this.client = await mongoose.connect(
        `mongodb://${this.#config.username}:${this.#config.password}@${
          this.#config.host
        }:${this.#config.port}/${this.#config.database}`
      );
    } catch (error: unknown) {
      this.#logger.error((error as Error)?.message);
    }
  }
}
