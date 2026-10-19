import {FilterNode} from './filter-nodes/filter-node';

export type NodeAction = (filterNode: FilterNode) => void;

export type NodeMapper<T> = (filterNode: FilterNode) => T;

export type NodeSetter<T> = (child: T, parent: T) => void;

export class FilterTreeVisitor {

	static visit(node: FilterNode, action: NodeAction): void {
		this.visitInternal(node, action, []);
	}

	static map<T>(node: FilterNode, mapper: NodeMapper<T>, setter: NodeSetter<T>): T {
		const nodesArray: FilterNode[] = [];
		const resultsArray: T[] = [];
		return this.mapInternal(node, mapper, setter, nodesArray, resultsArray);
	}

	private static mapInternal<T>(node: FilterNode, mapper: NodeMapper<T>, setter: NodeSetter<T>
		, nodesArray: FilterNode[], resultsArray: T[]): T {
		if (!node || node.isEmpty()) {
			return null;
		}
		const index = nodesArray.indexOf(node);
		if (index > -1) {
			return resultsArray[index];
		}
		const result = mapper(node);
		nodesArray.push(node);
		resultsArray.push(result);
		const children = node.children;
		if (children) {
			for (const child of children) {
				const mappedChild = this.mapInternal(child, mapper, setter, nodesArray, resultsArray);
				setter(mappedChild, result);
			}
		}
		return result;
	}

	static getRoot(node: FilterNode): FilterNode {
		if (node.parent) {
			return this.getRoot(node.parent);
		}
		return node;
	}

	private static visitInternal(node: FilterNode, action: NodeAction, array: FilterNode[]) {
		if (!node || node.isEmpty()) {
			return;
		}
		if (array.indexOf(node) > -1) {
			return;
		}
		array.push(node);
		action(node);
		const children = node.children;
		if (children) {
			for (const child of children) {
				this.visitInternal(child, action, array);
			}
		}
	}

	// static createNode(type: FilterNodeType, parent: FilterNode) {
	// 	switch (type) {
	// 		case FilterNodeType.Logical:
	// 			return new LogicalFilterNode(parent);
	// 	}
	// 	console.log('not implemented');
	// }

}
