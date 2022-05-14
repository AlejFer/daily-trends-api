import mongoose from "mongoose";
import { Datasource } from "../../domain/datasource";

type IMongoConfig = {
  host: string,
  port: string,
  username: string,
  password: string,
  database: string,
};

export class MongoDatasource implements Datasource<mongoose.Mongoose> {
  #config: IMongoConfig;

  client: mongoose.Mongoose | undefined;

  constructor(config: IMongoConfig) {
    this.#config = config;
  }

  public async init(){
    try {
      this.client = await mongoose.connect(
        `mongodb://${this.#config.username}:${this.#config.password}@${this.#config.host}:${this.#config.port}/${this.#config.database}`
      );
    } catch (error) {
      throw error;
    }
  }
}
