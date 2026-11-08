import {GroupItem} from './group-item';
import {AggregationInfo} from './aggregation-info';
import {SortItem} from '../sort-item';
import {GroupListRequest} from './group-list-request';
import {LambdaFilterNode} from '../filtering/filter-nodes/lambda-filter-node';
import {EntityTypeMetadata} from '../../abstractions/metadata-abstractions';
import {PropertyMetadataImplementation} from '../../common-models/metadata/property-metadata-implementation';
import {EntityTypeMetadataImplementation} from '../../common-models/metadata/entity-type-metadata-implementation';

export class GroupingInfo {
	public groupBy: GroupItem[] = [];
	public aggregations: AggregationInfo[] = [];

	constructor(public entityType: EntityTypeMetadata) {

	}

	public getRequest(filters: LambdaFilterNode[], orders: SortItem[], startIndex?: number, count?: number) {
		return new GroupListRequest(this.entityType.name, filters, orders, this.groupBy, this.aggregations, startIndex, count);
	}

	public getFakeSemantics(): EntityTypeMetadata {
		const cols: PropertyMetadataImplementation[] = [];
		const fakeType = new EntityTypeMetadataImplementation('Groupped' + this.entityType.name, 'Group', 'Groups', -1, undefined, undefined);

		let propIndex = 0;
		for (let i = 0; i < this.groupBy.length; i++) {
			propIndex++;
			const prop = this.groupBy[i].property;
			cols.push(new PropertyMetadataImplementation('Item' + propIndex, prop.generalUsage, prop.dataType
				, prop.entityTypeName, prop.foreignKeyName, prop.inversePropertyName, undefined, prop.entityType
				, prop.inverseProperty, prop.foreignKeyProperty, prop.facetValues, prop.title, prop.isNullable));
		}

		for (let i = 0; i < this.aggregations.length; i++) {
			propIndex++;
			const agg = this.aggregations[i];
			cols.push(new PropertyMetadataImplementation('Item' + propIndex, 'NormalData'
				, agg.getDataType(), undefined, undefined, undefined, undefined, undefined, undefined, undefined, {}, agg.getResultName(), true));
		}

		fakeType.properties = {};
		fakeType.propertyNames = [];
		for (const prop of cols) {
			if (!prop.name) {
				continue;
			}
			fakeType.properties[prop.name] = prop;
			fakeType.propertyNames.push(prop.name);
		}
		return fakeType;
	}


	public canMakeChart(): boolean {
		let isAllSame = true;
		for (const agg of this.aggregations) {
			if ((agg.sourceProperty && agg.sourceProperty.name) !==
				(this.aggregations[0].sourceProperty && this.aggregations[0].sourceProperty.name)) {
				isAllSame = false;
				break;
			}
		}
		return this.groupBy.length === 1 && (this.aggregations.length === 1 || isAllSame);
	}

	public hasSelectedGrouping(): boolean {
		return !((this.groupBy && this.groupBy.length === 0) && (this.aggregations && this.aggregations.length === 0));
	}

	public isValid(): boolean {
		return true;
	}

	public toString() {
		if (!this.isValid()) {
			return 'Selected grouping is not valid';
		} else if (!this.hasSelectedGrouping()) {
			return 'No grouping is selected';
		} else {
			let result = '';
			this.aggregations.forEach(a => {
				result += a.getResultName();
			});
			if (this.groupBy.length) {
				result += ' grouped by ';
			}
			this.groupBy.forEach(g => {
				result += g.property.title;
			});
			return result;
		}
	}

}
