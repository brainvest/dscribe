export class LogicalOperator {
	constructor(public name: string,
							public title: string,
							public minNumberOfOperands: number,
							public maxNumberOfOperands: number) {
	}

	static logicalOperators: LogicalOperator[] = [
		new LogicalOperator('And', 'And', 2, null),
		new LogicalOperator('Or', 'Or', 2, null),
		new LogicalOperator('Not', 'Not', 1, 1)
	];
}
