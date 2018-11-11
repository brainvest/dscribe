import {ManageEntityModes} from './models/manage-entity-modes';

export class AddNEditHelper {
	public static actionName(action: ManageEntityModes): string {
		switch (action) {
			case ManageEntityModes.Insert:
				return 'Add';
			case ManageEntityModes.Update:
				return 'Edit';
			default:
				throw 'Unknown action mode: ' + action;
		}
	}

	public static joinPath(path1: string, path2: string): string {
		if (!path1 || !path2 || path1.endsWith('.') || path2.startsWith('.')) {
			return path1 + path2;
		}
		return path1 + '.' + path2;
	}
}
