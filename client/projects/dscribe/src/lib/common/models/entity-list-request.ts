import {LambdaFilterNode} from '../../filtering/models/filter-nodes/lambda-filter-node';
import {SortItem} from './sort-item';

export class EntityListRequest {
	constructor(public entityTypeName: string, public filters: LambdaFilterNode[],
							public startIndex?: number, public count?: number, public order?: SortItem[]) {
	}

	public getRequestObject(): any {
		return {
			entityTypeName: this.entityTypeName,
			filters: this.filters.map(x => x.getStorageNode()).filter(x => x),
			order: this.order,
			startIndex: this.startIndex,
			count: this.count
		};
	}
}
