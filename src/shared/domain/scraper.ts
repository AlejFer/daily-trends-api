export interface IScraper<T> {
  getContent(): Promise<T[]>;
}
