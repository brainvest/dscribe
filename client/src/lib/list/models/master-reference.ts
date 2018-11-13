import {ListComponent} from '../list/list.component';
import {PropertyMetadata} from '../../metadata/property-metadata';
import {EntityTypeMetadata} from '../../metadata/entity-type-metadata';

export class MasterReference {
	public childList: ListComponent;

	constructor(public master: any,
							public masterProperty: PropertyMetadata) {
	}

}
