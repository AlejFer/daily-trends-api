import { IScraper, BaseScraper, ILogger } from '../../../shared/domain/';
import { ExternalSource, IFeed } from '../models/feed';
import { FeedRepository } from '../repositories/feed.repository';

export class FeedProviderElPaisService
  extends BaseScraper
  implements IScraper<IFeed>
{
  #PROVIDER_URL = 'https://elpais.com';
  #PROVIDER_AMOUNT_FEEDS = 5;
  #feedRepository: FeedRepository;
  constructor(logger: ILogger, feedRepository: FeedRepository) {
    super(logger);
    this.#feedRepository = feedRepository;
  }
  async getContent(): Promise<IFeed[]> {
    const $ = await this.load(this.#PROVIDER_URL);
    const feeds: IFeed[] = [];
    if ($) {
      const sections = $('section._g._g-md._g-o.b.b-d.b--o');
      sections.each((_i, el) => {
        $(el)
          .find('div')
          .each((_i, div) => {
            $(div)
              .find('article')
              .each((_i, article) => {
                const header = $(article).find('h2').text();
                const externalLink = $(article).find('a').attr('href');
                const description = $(article).find('p').text();
                const videoImage = $(article).find('video').attr('data-poster');
                const image = $(article).find('img').attr('src');
                const feed: IFeed = {
                  date: new Date(),
                  description,
                  externalLink:
                    externalLink && externalLink.startsWith('/')
                      ? `${this.#PROVIDER_URL}${externalLink}`
                      : externalLink,
                  header,
                  figure: image || videoImage,
                  externalSource: ExternalSource.EL_PAIS,
                };
                feeds.push(feed);
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
