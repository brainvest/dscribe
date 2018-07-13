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
		new ComparisonOperator('Equal', 'Equals', 2, 2, true),
		new ComparisonOperator('NotEqual', 'Not Equals', 2, 2, true),
		new ComparisonOperator('IsNull', 'Is Null', 1, 1, false, p => p.isNullable),
		new ComparisonOperator('IsNotNull', 'Is Not Null', 1, 1, false, p => p.isNullable),
		new ComparisonOperator('LessThan', 'Less than', 2, 2, false),
		new ComparisonOperator('GreaterThan', 'Greater than', 2, 2, false),
		new ComparisonOperator('LessThanOrEqual', 'Less than or equal', 2, 2, false),
		new ComparisonOperator('GreaterThanOrEqual', 'Greater than or equal', 2, 2, false),
		new ComparisonOperator('Between', 'Between', 3, 3, false),
		new ComparisonOperator('Contains', 'Contains', 2, 2, true, null, [DataTypes.string]),
		new ComparisonOperator('StartsWith', 'Starts with', 2, 2, true, null, [DataTypes.string]),
		new ComparisonOperator('EndsWith', 'Ends with', 2, 2, true, null, [DataTypes.string])
	];
}
