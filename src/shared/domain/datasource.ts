/**
 * Datasource interface
 */
export interface Datasource<T> {
  client: T | undefined;

  /**
   * Initializes datasource
   */
  init(): Promise<void>;
}
