import { CheerioAPI, load } from 'cheerio';
import axios from 'axios';
import { ILogger } from './logger';

export abstract class BaseScraper {
  protected logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async load(url: string): Promise<CheerioAPI | undefined> {
    return axios(url)
      .then(({ data }) => load(data))
      .catch((e: Error) => {
        this.logger.warn(e.message);
        return undefined;
      });
  }
}
