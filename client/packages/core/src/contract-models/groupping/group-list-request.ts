import {SortItem} from '../sort-item';
import {GroupItem} from './group-item';
import {AggregationInfo} from './aggregation-info';
import {LambdaFilterNode} from '../filtering/filter-nodes/lambda-filter-node';

export class GroupListRequest {
	constructor(public entityTypeName: string | undefined = undefined,
		public filters: LambdaFilterNode[] = [],
		public order: SortItem[] = [],
		public groupBy: GroupItem[] = [],
		public aggregations: AggregationInfo[] = [],
		public startIndex?: number,
		public count?: number) {
	}

	public getRequestObject(): any {
		return {
			entityTypeName: this.entityTypeName,
			filters: this.filters.map(x => x.getStorageNode()).filter(x => x),
			order: this.order,
			groupBy: this.groupBy.map(x => {
				return {
					propertyName: x.property.name
				};
			}),
			aggregations: this.aggregations.map(x => {
				return {
					sourcePropertyName: x.sourceProperty && x.sourceProperty.name,
					aggregate: x.aggregate
				};
			}),
			startIndex: this.startIndex,
			count: this.count
		};
	}
}
