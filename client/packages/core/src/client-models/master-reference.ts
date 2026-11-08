import {PropertyMetadata} from "../abstractions/metadata-abstractions";

export class MasterReference {
	// public childList: {onMasterChanged(): void};
	// public count: number;

	constructor(public master: any,
		public masterProperty: PropertyMetadata) {
	}

}
