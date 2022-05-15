/**
 * ID type definition
 */
export type ID = string;

/**
 * Repository interface
 */
export interface Repository<T> {
  /**
   * Get all <T> from datasource
   */
  getAll(): Promise<T[]>;

  /**
   * Get <T> by ID from datasource
   */
  getById(id: ID): Promise<T | null>;

  /**
   * Save given <T> into datasource
   */
  save(value: T, id?: ID): Promise<T | null>;

  /**
   * Delete <T> by ID from datasource
   */
  delete(id: ID): void;
}
