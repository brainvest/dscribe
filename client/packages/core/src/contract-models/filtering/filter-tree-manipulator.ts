import {LogicalFilterNode} from './filter-nodes/logical-filter-node';
import {ArithmeticFilterNode} from './filter-nodes/arithmetic-filter-node';
import {FilterNodeType} from './filter-node-type';
import {LambdaFilterNode} from './filter-nodes/lambda-filter-node';
import {FilterNode} from './filter-nodes/filter-node';
import {PropertyFilterNode} from './filter-nodes/property-filter-node';
import {ComparisonFilterNode} from './filter-nodes/comparison-filter-node';
import {Injectable} from '@angular/core';

@Injectable()
export class FilterTreeManipulator {
	addSibling(node: FilterNode) {
		const oldNode = node;
		const oldParent = oldNode.parent;
		const newParent: FilterNode = oldNode.nodeType === FilterNodeType.Comparison || oldNode.nodeType === FilterNodeType.Logical ?
			new LogicalFilterNode(oldParent) : new ArithmeticFilterNode(oldParent);
		oldParent.replaceChild(node, newParent);
		node.parent = newParent;
		if (newParent.nodeType === FilterNodeType.Logical) {
			(newParent as LogicalFilterNode).operator = (newParent as LogicalFilterNode).operators[0];
		}
		if (newParent.children.length === 0) {
			newParent.addChild(node.nodeType === FilterNodeType.Constant);
		}
		newParent.replaceChild(newParent.children[0], node);
	}

	toggleType(node: FilterNode) {
		if (node.parent.nodeType === FilterNodeType.Arithmetic) {
			(node.parent as ArithmeticFilterNode).toggleChildType(node);
		} else if (node.parent.nodeType === FilterNodeType.Comparison) {
			(node.parent as ComparisonFilterNode).toggleChildType(node);
		}
	}

	delete(node: FilterNode) {
		const isParentLambda = node.parent.nodeType === FilterNodeType.Lambda;
		let minNumberOfOperands = 1000;
		const parent = node.parent;
		if (node.parent.nodeType === FilterNodeType.Logical) {
			minNumberOfOperands = (node.parent as LogicalFilterNode).operator.minNumberOfOperands;
		} else if (node.parent.nodeType === FilterNodeType.Arithmetic) {
			minNumberOfOperands = (node.parent as ArithmeticFilterNode).operator.minOperandCount;
		}

		if (isParentLambda) {
			const newChild = (node.parent as LambdaFilterNode).isValueSelection()
				? new PropertyFilterNode(node.parent)
				: new ComparisonFilterNode(node.parent);
			node.parent.replaceChild(node.parent.children[0], newChild);
			// node = newChild;
		} else if (parent && parent.children.length <= minNumberOfOperands) {
			const oldParent = node.parent;
			const newParent = node.parent.parent;
			oldParent.removeChild(node);
			const newChild = oldParent.children[0];
			newParent.replaceChild(oldParent, newChild);
			newChild.parent = newParent;
		} else {
			const siblings = node.parent.children;
			siblings.splice(siblings.indexOf(node), 1);
		}
	}

}
