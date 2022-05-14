export type ID = string;

export interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: ID): Promise<T | null>;
  save(value: T, id?: ID): Promise<T | null>;
  delete(id: ID): void;
}
