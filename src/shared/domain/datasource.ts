export interface Datasource<T> {
  client: T | undefined;
  init(): Promise<void>
}
