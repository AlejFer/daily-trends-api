import { v4 } from 'uuid';
import { ID } from './repository';

/**
 * BaseRepository Abstraction
 */
export abstract class BaseRepository {
  /**
   * Generates a UUID V4
   * @returns ID
   */
  protected generateID(): ID {
    return v4();
  }
}
