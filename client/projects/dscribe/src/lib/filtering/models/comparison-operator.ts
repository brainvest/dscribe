import {HasTypeInfo} from '../../metadata/property-metadata';
import {DataTypes} from '../../metadata/data-types';

export class ComparisonOperator {
	constructor(public name: string,
							public title: string,
							public minOperandCount: number,
							public maxOperandCount: number,
							public allowMultipleValues: boolean,
							public condition?: (prop: HasTypeInfo) => boolean,
							public dataTypes?: string[]) {
	}

	static Operators = [
		new ComparisonOperator('Equal', 'برابر', 2, 2, true),
		new ComparisonOperator('NotEqual', 'نابرابر', 2, 2, true),
		new ComparisonOperator('IsNull', 'خالی', 1, 1, false, p => p.isNullable),
		new ComparisonOperator('IsNotNull', 'خالی نیست', 1, 1, false, p => p.isNullable),
		new ComparisonOperator('LessThan', 'کمتر از', 2, 2, false),
		new ComparisonOperator('GreaterThan', 'بیشتر از', 2, 2, false),
		new ComparisonOperator('LessThanOrEqual', 'کمتر مساوی', 2, 2, false),
		new ComparisonOperator('GreaterThanOrEqual', 'بیشتر مساوی', 2, 2, false),
		new ComparisonOperator('Between', 'بین', 3, 3, false),
		new ComparisonOperator('Contains', 'شامل', 2, 2, true, null, [DataTypes.string]),
		new ComparisonOperator('StartsWith', 'شروع با', 2, 2, true, null, [DataTypes.string]),
		new ComparisonOperator('EndsWith', 'پایان با', 2, 2, true, null, [DataTypes.string])
	];
}
