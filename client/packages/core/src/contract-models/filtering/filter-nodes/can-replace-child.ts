import {FilterNode} from './filter-node';

export interface CanReplaceChild {
	replaceChild(oldChild: FilterNode, newChild: FilterNode);
}
