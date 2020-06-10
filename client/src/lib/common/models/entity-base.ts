import {HasId} from './has-id';
import {PrimaryKey} from './primary-key';

export abstract class EntityBase implements HasId {
	Id: PrimaryKey;
}
