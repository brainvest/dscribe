import {PrimaryKey} from "./primary-key";

export class IdAndName {
	public EntityType: string;
	public Names: { DisplayName: string, Id: PrimaryKey }[];
}
