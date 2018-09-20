import {SimpleAggregate} from './simple-aggregate.enum';

export class AggregationHelper {
	public static getPersianTitle(agg: SimpleAggregate): string {
		switch (agg) {
			case SimpleAggregate.Average:
				return 'میانگین';
			case SimpleAggregate.Count:
				return 'تعداد';
			case SimpleAggregate.Max:
				return 'بیشترین مقدار';
			case SimpleAggregate.Min:
				return 'کمترین مقدار';
			case SimpleAggregate.Sum:
				return 'مجموع';
		}
	}
}
