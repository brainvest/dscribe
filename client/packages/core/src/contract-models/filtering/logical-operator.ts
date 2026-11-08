export class LogicalOperator {
	constructor(public name: string,
		public title: string,
		public minNumberOfOperands: number,
		public maxNumberOfOperands?: number) {
	}

	static logicalOperators: LogicalOperator[] = [
		new LogicalOperator('And', 'And', 2),
		new LogicalOperator('Or', 'Or', 2),
		new LogicalOperator('Not', 'Not', 1, 1)
	];
}
