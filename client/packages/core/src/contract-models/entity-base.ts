import {HasId} from './has-id';
import {PrimaryKey} from './primary-key';

export type EntityBase = HasId & {
	id: PrimaryKey;
};
