import {HasTypeInfo} from '../../metadata/property-metadata';
import {DataTypes} from '../../metadata/data-types';

export class ArithmeticOperator {

	static Operators = [
		new ArithmeticOperator('Add', 'به‌علاوه', 2, null, false, ArithmeticOperator.toSame, null, ArithmeticOperator.numbers),
		new ArithmeticOperator('Subtract', 'منهای', 2, 2, false, ArithmeticOperator.toSame, null, ArithmeticOperator.numbers),
		new ArithmeticOperator('Multiply', 'ضربدر', 2, null, false, ArithmeticOperator.toSame, null, ArithmeticOperator.numbers),
		new ArithmeticOperator('Divide', 'تقسیم‌بر', 2, 2, false, ArithmeticOperator.toDecimal, null, ArithmeticOperator.numbers),
		new ArithmeticOperator('Log', 'لگاریتم', 1, 1, false, ArithmeticOperator.toDecimal, null, ArithmeticOperator.numbers),
		new ArithmeticOperator('Power', 'به‌توان', 2, 2, false, ArithmeticOperator.toDecimal, null, ArithmeticOperator.numbers),
		new ArithmeticOperator('Abs', 'قدر مطلق', 1, 1, false, ArithmeticOperator.toSame, null, ArithmeticOperator.numbers)
	];

	private static numbers: string[] = [DataTypes.decimal, DataTypes.int, DataTypes.long];
	private static toSame: (input: string) => string = (x) => x;
	private static toInt: (input: string) => string = (x) => DataTypes.decimal;
	private static toDecimal: (input: string) => string = (x) => DataTypes.int;


	constructor(public name: string,
							public title: string,
							public minOperandCount: number,
							public maxOperandCount: number,
							public allowMultipleValues: boolean,
							public dataTypeMap: (input: string) => string,
							public condition?: (prop: HasTypeInfo) => boolean,
							public dataTypes?: string[]) {
	}

}
