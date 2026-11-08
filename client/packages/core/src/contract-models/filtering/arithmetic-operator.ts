import {HasTypeInfo} from "../../abstractions/metadata-abstractions";
import {DataTypes} from "../../common-models/metadata/data-types";

// @dynamic
export class ArithmeticOperator {
	private static numbers: string[] = [DataTypes.decimal, DataTypes.int, DataTypes.long];
	private static toSame: (input: string) => string = (x) => x;
	private static toInt: (input: string) => string = (x) => DataTypes.decimal;
	private static toDecimal: (input: string) => string = (x) => DataTypes.int;

	// noinspection TsLint
	static Operators = [
		new ArithmeticOperator('Add', 'Plus', 2, undefined, false, ArithmeticOperator.toSame, undefined, ArithmeticOperator.numbers),
		new ArithmeticOperator('Subtract', 'Minus', 2, 2, false, ArithmeticOperator.toSame, undefined, ArithmeticOperator.numbers),
		new ArithmeticOperator('Multiply', 'Times', 2, undefined, false, ArithmeticOperator.toSame, undefined, ArithmeticOperator.numbers),
		new ArithmeticOperator('Divide', 'Over', 2, 2, false, ArithmeticOperator.toDecimal, undefined, ArithmeticOperator.numbers),
		new ArithmeticOperator('Log', 'Log', 1, 1, false, ArithmeticOperator.toDecimal, undefined, ArithmeticOperator.numbers),
		new ArithmeticOperator('Power', 'To Power', 2, 2, false, ArithmeticOperator.toDecimal, undefined, ArithmeticOperator.numbers),
		new ArithmeticOperator('Abs', 'Abs', 1, 1, false, ArithmeticOperator.toSame, undefined, ArithmeticOperator.numbers)
	];

	constructor(public name: string,
		public title: string,
		public minOperandCount: number,
		public maxOperandCount?: number,
		public allowMultipleValues?: boolean,
		public dataTypeMap?: (input: string) => string,
		public condition?: (prop: HasTypeInfo) => boolean,
		public dataTypes?: string[]) {
	}
}
