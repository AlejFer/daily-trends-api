import { CheerioAPI, load } from 'cheerio';
import axios from 'axios';
import { ILogger } from './logger';

/**
 * BaseScraper Abstraction
 */
export abstract class BaseScraper {
  protected logger: ILogger;

  /**
   * Constructor
   * @param logger Logger
   */
  constructor(logger: ILogger) {
    this.logger = logger;
  }

  /**
   * Loads the URL and transforms the HTML into Cheerio interpretation
   * @param url URL to scrape
   * @returns CheerioAPI
   */
  async load(url: string): Promise<CheerioAPI | undefined> {
    return axios(url)
      .then(({ data }) => load(data))
      .catch((e: Error) => {
        this.logger.warn(e.message);
        return undefined;
      });
  }
}
