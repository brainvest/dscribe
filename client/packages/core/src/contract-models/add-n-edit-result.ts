import {ManageEntityModes} from '../../add-n-edit/models/manage-entity-modes';

export class AddNEditResult {
	constructor(public action: ManageEntityModes,
							public instance: any) {
	}
}
