/**
 * Scrapin interface
 */
export interface IScraper<T> {
  /**
   * Get web content by scraping technique
   */
  getContent(): Promise<T[]>;
}
