import mongoose from "mongoose";
import { Datasource, ILogger } from "../../domain";

type IMongoConfig = {
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
};

export class MongoDatasource implements Datasource<mongoose.Mongoose> {
  #config: IMongoConfig;
  #logger: ILogger;
  client: mongoose.Mongoose | undefined;

  constructor(config: IMongoConfig, logger: ILogger) {
    this.#config = config;
    this.#logger = logger;
  }

  public async init(){
    try {
      this.client = await mongoose.connect(
        `mongodb://${this.#config.username}:${this.#config.password}@${this.#config.host}:${this.#config.port}/${this.#config.database}`
      );
    } catch (error: any) {
      this.#logger.error(error?.message);
    }
  }
}
