import { IScraper, BaseScraper, ILogger } from '../../../shared/domain/';
import { ExternalSource, IFeed } from '../models/feed';
import { FeedRepository } from '../repositories/feed.repository';

/**
 * FeedProviderElMundoService Scraper Implementation for ELMUNDO provider
 */
export class FeedProviderElMundoService
  extends BaseScraper
  implements IScraper<IFeed>
{
  #PROVIDER_URL = 'https://www.elmundo.es';
  #PROVIDER_AMOUNT_FEEDS = 5;
  #feedRepository: FeedRepository;

  /**
   * Constructor
   * @param logger Logger
   * @param feedRepository Feed Repository
   */
  constructor(logger: ILogger, feedRepository: FeedRepository) {
    super(logger);
    this.#feedRepository = feedRepository;
  }

  async getContent(): Promise<IFeed[]> {
    const $ = await this.load(this.#PROVIDER_URL);
    const feeds: IFeed[] = [];
    if ($) {
      const body = $('div.ue-l-cover-grid__row');
      body.each((_i, div) => {
        $(div)
          .find('div')
          .each((_i, panel) => {
            $(panel)
              .find('div')
              .each((_i, divArticle) => {
                $(divArticle)
                  .find('article')
                  .each((_i, article) => {
                    const header = $(article).find('h2').text();
                    const externalLink = $(article).find('a').attr('href');
                    const description = $(article).find('p').text();
                    const image = $(article).find('img').attr('src');
                    const feed: IFeed = {
                      date: new Date(),
                      description,
                      externalLink,
                      header,
                      figure: image,
                      externalSource: ExternalSource.EL_MUNDO,
                    };
                    feeds.push(feed);
                    return feeds.length < this.#PROVIDER_AMOUNT_FEEDS;
                  });
                return feeds.length < this.#PROVIDER_AMOUNT_FEEDS;
              });
            return feeds.length < this.#PROVIDER_AMOUNT_FEEDS;
          });
        return feeds.length < this.#PROVIDER_AMOUNT_FEEDS;
      });
    }
    for (const feed of feeds) {
      await this.#feedRepository.validateAndSave(feed);
    }
    return feeds;
  }
}
