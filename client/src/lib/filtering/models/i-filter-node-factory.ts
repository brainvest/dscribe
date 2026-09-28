import {FilterNodeType} from './filter-node-type';
import {FilterNode} from './filter-nodes/filter-node';

export interface IFilterNodeFactory {
	create(type: FilterNodeType, parent: FilterNode): FilterNode;
}
