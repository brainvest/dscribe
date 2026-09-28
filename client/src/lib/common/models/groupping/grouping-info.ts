import {GroupItem} from './group-item';
import {AggregationInfo} from './aggregation-info';
import {EntityTypeMetadata} from '../../../metadata/entity-type-metadata';
import {LambdaFilterNode} from '../../../filtering/models/filter-nodes/lambda-filter-node';
import {SortItem} from '../sort-item';
import {GroupListRequest} from './group-list-request';
import {PropertyMetadata} from '../../../metadata/property-metadata';

export class GroupingInfo {
	public groupBy: GroupItem[] = [];
	public aggregations: AggregationInfo[] = [];

	constructor(public entityType: EntityTypeMetadata) {

	}

	public getRequest(filters: LambdaFilterNode[], orders: SortItem[], startIndex: number = null, count: number = null) {
		return new GroupListRequest(this.entityType.name, filters, orders, this.groupBy, this.aggregations, startIndex, count);
	}

	public getFakeSemantics(): EntityTypeMetadata {
		const cols: PropertyMetadata[] = [];
		const fakeType = new EntityTypeMetadata('Groupped' + this.entityType.name, 'Group', 'Groups', null);

		let propIndex = 0;
		for (let i = 0; i < this.groupBy.length; i++) {
			propIndex++;
			const prop = this.groupBy[i].property;
			cols.push(new PropertyMetadata('Item' + propIndex, 'item' + propIndex, prop.generalUsage, prop.dataType
				, prop.entityTypeName, prop.foreignKeyName, prop.inversePropertyName, null, prop.entityType
				, prop.inverseProperty, prop.foreignKeyProperty, prop.facetValues, prop.title, prop.isNullable));
		}

		for (let i = 0; i < this.aggregations.length; i++) {
			propIndex++;
			const agg = this.aggregations[i];
			cols.push(new PropertyMetadata('Item' + propIndex, 'item' + propIndex, 'NormalData'
				, agg.getDataType(), null, null, null, null, null, null, null, {}, agg.getResultName(), true));
		}

		fakeType.properties = {};
		fakeType.propertyNames = [];
		for (const prop of cols) {
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
