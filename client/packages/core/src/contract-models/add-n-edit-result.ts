import {ManageEntityModes} from "../client-models/manage-entity-modes";

export class AddNEditResult {
	constructor(public action: ManageEntityModes,
							public instance: any) {
	}
}
