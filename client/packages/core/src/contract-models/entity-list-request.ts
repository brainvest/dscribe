import {StorageFilterNode} from './filtering/storage-filter-node';
import {SortItem} from './sort-item';

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
