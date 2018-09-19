import {PropertyMetadata} from '../../../metadata/property-metadata';
import {SimpleAggregate} from './simple-aggregate.enum';
import {AggregationHelper} from './aggregation-helper';
import {DataTypes} from '../../../metadata/data-types';

export class AggregationInfo {
	constructor(public sourceProperty: PropertyMetadata, public aggregate: SimpleAggregate) {
	}

	getResultName(): string {
		return AggregationHelper.getPersianTitle(this.aggregate) + ' ' + ((this.sourceProperty && this.sourceProperty.title) || '');
	}

	getDataType() {
		return DataTypes.decimal;
	}
}
