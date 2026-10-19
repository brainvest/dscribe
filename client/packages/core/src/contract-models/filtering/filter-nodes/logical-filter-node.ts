import {FilterNode} from './filter-node';
import {LogicalOperator} from '../logical-operator';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterNodeType} from '../filter-node-type';
import {ComparisonFilterNode} from './comparison-filter-node';

export class LogicalFilterNode extends FilterNode {
	operators = LogicalOperator.logicalOperators;
	private _operator: LogicalOperator;
	private _children: FilterNode[] = [];

	constructor(parent: FilterNode) {
		super(parent);
	}

	setStorageNodeProperties(storage: StorageFilterNode) {
		storage.operator = this.operator.name;
	}

	applyStorageNode(storage: StorageFilterNode) {
		this.operator = this.operators.find(x => x.name === storage.operator);
	}

	childOutputTypeChanged(child: FilterNode) {
		const index = this._children.indexOf(child);
		if (index !== 0) {
			return;
		}
		this.outputType = child.outputType;
		super.childOutputTypeChanged(child);
	}

	get nodeType(): FilterNodeType {
		return FilterNodeType.Logical;
	}

	get children(): FilterNode[] {
		return this._children;
	}

	addChild() {
		this.children.push(new ComparisonFilterNode(this));
	}

	removeChild(child: FilterNode) {
		const index = this.children.indexOf(child);
		if (index === -1) {
			return;
		}
		this.children.splice(index, 1);
	}

	isEmpty(): boolean {
		return !this.operator || this.children.filter(x => !x.isEmpty()).length === 0;
	}

	isValid(): boolean {
		return this.isEmpty() || this.children.filter(x => !x.isValid()).length === 0;
	}

	canReplaceChild() {
		return true;
	}

	replaceChild(oldChild: FilterNode, newChild: FilterNode) {
		const index = this._children.indexOf(oldChild);
		if (index === -1) {
			return;
		}
		this._children[index] = newChild;
	}

	get operator(): LogicalOperator {
		return this._operator;
	}

	set operator(value: LogicalOperator) {
		this._operator = value;
		if (!this.operator) {
			return;
		}
		while (this.operator.minNumberOfOperands > this._children.length) {
			const child = new ComparisonFilterNode(this);
			this._children.push(child);
		}
		if (this.operator.maxNumberOfOperands !== null && this.operator.maxNumberOfOperands !== undefined &&
			this.operator.maxNumberOfOperands < this._children.length) {
			this._children.splice(this.operator.maxNumberOfOperands, this._children.length - this.operator.maxNumberOfOperands);
		}
	}
}
