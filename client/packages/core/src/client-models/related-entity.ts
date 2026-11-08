import {EntityTypeMetadata} from "../abstractions/metadata-abstractions";

export class RelatedEntity {
	constructor(public entity: any, public entityTypeMetadata: EntityTypeMetadata) {
	}
}
