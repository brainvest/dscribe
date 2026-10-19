export class AggregationOperator {
	constructor(public name: string,
							public title: string,
							public hasFiltering: boolean,
							public isBoolean: boolean,
							public hasSelection: boolean,
							public dataTypeMap: { [key: string]: string } = null) {
	}

	public static Operators = [
		new AggregationOperator('IsEmpty', 'Is Empty', false, true, false),
		new AggregationOperator('IsNotEmpty', 'Is Not Empty', false, true, false),
		new AggregationOperator('Any', 'Any', true, true, false),
		new AggregationOperator('All', 'All', true, true, false),
		new AggregationOperator('None', 'None', true, true, false),
		new AggregationOperator('Count', 'Count', true, false, false, {'_': 'int'}),
		new AggregationOperator('Sum', 'Sum', true, false, true, {
			'int': 'int',
			'long': 'long',
			'decimal': 'decimal'
		}),
		new AggregationOperator('Average', 'Average', true, false, true, {
			'decimal': 'decimal',
			'int': 'decimal',
			'long': 'decimal'
		})
	];
}
