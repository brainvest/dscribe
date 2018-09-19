import {IFilterNodeFactory} from './i-filter-node-factory';
import {FilterNodeType} from './filter-node-type';
import {FilterNode} from './filter-nodes/filter-node';
import {LambdaFilterNode} from './filter-nodes/lambda-filter-node';
import {ConstantFilterNode} from './filter-nodes/constant-filter-node';
import {ArithmeticFilterNode} from './filter-nodes/arithmetic-filter-node';
import {ComparisonFilterNode} from './filter-nodes/comparison-filter-node';
import {LogicalFilterNode} from './filter-nodes/logical-filter-node';
import {NavigationListFilterNode} from './filter-nodes/navigation-list-filter-node';
import {PropertyFilterNode} from './filter-nodes/property-filter-node';
import {EntityMetadata} from '../../metadata/entity-metadata';

export class FilterNodeFactory implements IFilterNodeFactory {
	create(type: FilterNodeType, parent: FilterNode, entityType?: EntityMetadata, isValueSelection?: boolean) {
		switch (type) {
			case FilterNodeType.Lambda:
				return new LambdaFilterNode(parent, entityType, isValueSelection);
			case FilterNodeType.Constant:
				return new ConstantFilterNode(parent);
			case FilterNodeType.Arithmetic:
				return new ArithmeticFilterNode(parent);
			case FilterNodeType.Comparison:
				return new ComparisonFilterNode(parent);
			case FilterNodeType.Logical:
				return new LogicalFilterNode(parent);
			case FilterNodeType.NavigationList:
				return new NavigationListFilterNode(parent);
			case FilterNodeType.Property:
				return new PropertyFilterNode(parent);
		}
	}
}
