import {PrimaryKey} from "./primary-key";

export interface HasIdName {
	id: PrimaryKey;
	displayName: string;
}
