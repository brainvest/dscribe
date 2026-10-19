import {SimpleAggregate} from './simple-aggregate.enum';

export class AggregationHelper {
	public static getPersianTitle(agg: SimpleAggregate): string {
		switch (agg) {
			case SimpleAggregate.Average:
				return 'Average';
			case SimpleAggregate.Count:
				return 'Count';
			case SimpleAggregate.Max:
				return 'Max';
			case SimpleAggregate.Min:
				return 'Min';
			case SimpleAggregate.Sum:
				return 'Sum';
		}
	}
}
