import {SortItem} from './sort-item';
import {StorageFilterNode} from '../../filtering/models/storage-filter-node';

export class EntityListRequest {
	constructor(public entityTypeName: string, public filters: StorageFilterNode[],
							public startIndex?: number, public count?: number, public order?: SortItem[]) {
	}

	public getRequestObject(): any {
		return {
			entityTypeName: this.entityTypeName,
			filters: this.filters,
			order: this.order,
			startIndex: this.startIndex,
			count: this.count
		};
	}
}
