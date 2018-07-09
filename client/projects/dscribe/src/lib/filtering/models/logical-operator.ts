export class LogicalOperator {
	constructor(public name: string,
							public title: string,
							public minNumberOfOperands: number,
							public maxNumberOfOperands: number) {
	}

	static logicalOperators: LogicalOperator[] = [
		new LogicalOperator('And', 'و', 2, null),
		new LogicalOperator('Or', 'یا', 2, null),
		new LogicalOperator('Not', 'نهی', 1, 1)
	];
}
