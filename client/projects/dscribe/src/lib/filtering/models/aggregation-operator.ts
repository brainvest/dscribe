export class AggregationOperator {
	constructor(public name: string,
							public title: string,
							public hasFiltering: boolean,
							public isBoolean: boolean,
							public hasSelection: boolean,
							public dataTypeMap: { [key: string]: string } = null) {
	}

	public static Operators = [
		new AggregationOperator('IsEmpty', 'خالی', false, true, false),
		new AggregationOperator('IsNotEmpty', 'خالی نیست', false, true, false),
		new AggregationOperator('Any', 'حداقل‌یکی', true, true, false),
		new AggregationOperator('All', 'همه', true, true, false),
		new AggregationOperator('None', 'هیچ‌کدام', true, true, false),
		new AggregationOperator('Count', 'تعداد', true, false, false, {'_': 'int'}),
		new AggregationOperator('Sum', 'جمع', true, false, true, {
			'int': 'int',
			'long': 'long',
			'decimal': 'decimal'
		}),
		new AggregationOperator('Average', 'میانگین', true, false, true, {
			'decimal': 'decimal',
			'int': 'decimal',
			'long': 'decimal'
		})
	];
}
