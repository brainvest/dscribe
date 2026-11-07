import {PropertyMetadata} from '../../metadata/property-metadata';
import {EntityTypeMetadata} from '../../metadata/entity-type-metadata';

export class MasterReference {
	public childList: { onMasterChanged(): void };
	public count: number;

	constructor(public master: any,
							public masterProperty: PropertyMetadata) {
	}

}
