import { v4 } from 'uuid';
import { ID } from './repository';

export abstract class BaseRepository {
  protected generateID (): ID {
    return v4();
  }
}
