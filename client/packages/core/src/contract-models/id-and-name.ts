import {PrimaryKey} from "./primary-key";

export type IdAndName = {
	entityType: string;
	names: { displayName: string, id: PrimaryKey }[];
};
