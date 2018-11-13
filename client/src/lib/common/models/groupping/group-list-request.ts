import {LambdaFilterNode} from '../../../filtering/models/filter-nodes/lambda-filter-node';
import {SortItem} from '../sort-item';
import {GroupItem} from './group-item';
import {AggregationInfo} from './aggregation-info';

export class GroupListRequest {
	constructor(public entityTypeName: string = null,
							public filters: LambdaFilterNode[] = [],
							public order: SortItem[] = [],
							public groupBy: GroupItem[] = [],
							public aggregations: AggregationInfo[] = [],
							public startIndex: number,
							public count: number) {
	}

	public getRequestObject(): any {
		return {
			entityTypeName: this.entityTypeName,
			filters: this.filters.map(x => x.getStorageNode()).filter(x => x),
			order: this.order,
			groupBy: this.groupBy.map(x => {
				return {
					propertyName: x.property.Name
				};
			}),
			aggregations: this.aggregations.map(x => {
				return {
					sourcePropertyName: x.sourceProperty && x.sourceProperty.Name,
					aggregate: x.aggregate
				};
			}),
			startIndex: this.startIndex,
			count: this.count
		};
	}
}
