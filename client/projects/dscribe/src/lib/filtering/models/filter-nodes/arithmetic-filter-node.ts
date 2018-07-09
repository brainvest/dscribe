import {FilterNode} from './filter-node';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterNodeType} from '../filter-node-type';
import {PropertyFilterNode} from './property-filter-node';
import {ArithmeticOperator} from '../arithmetic-operator';
import {ConstantFilterNode} from './constant-filter-node';
import {HasTypeInfo} from '../../../metadata/property-metadata';

export class ArithmeticFilterNode extends FilterNode {
	private _operator: ArithmeticOperator;
	operators: ArithmeticOperator[];
	_children: FilterNode[] = [];
	_operandType: HasTypeInfo;

	constructor(parent: FilterNode) {
		super(parent);
		this.inputType = parent.childInputType;
		this._children[0] = new PropertyFilterNode(this);
		this.operator = null;
	}

	get inputType() {
		return this._inputType;
	}

	set inputType(value: HasTypeInfo) {
		if (value === this._inputType) {
			return;
		}
		this._inputType = value;
		if (this._children) {
			for (const child of this._children) {
				child.inputType = value;
			}
		}
	}

	childOutputTypeChanged(child: FilterNode) {
		if (this._children.indexOf(child) !== 0) {
			return;
		}
		if (child.outputType === this._operandType) {
			return;
		}
		this._operandType = child.outputType;
		const type = child.outputType;
		if (!type || !type.dataType) {
			this.operators = ArithmeticOperator.Operators;
			if (!this.operator || this.operators.indexOf(this.operator) === -1) {
				this.operator = this.operators[0];
			}
			return;
		}
		this.operators = ArithmeticOperator.Operators
			.filter(x => !x || ((!x.condition || x.condition(type)) &&
				(!x.dataTypes || x.dataTypes.indexOf(type.dataType) !== -1)));
		if (!this.operator || this.operators.indexOf(this.operator) === -1) {
			this.operator = this.operators[0];
		}
		for (child of this.children) {
			if (child.nodeType === FilterNodeType.Constant) {
				(child as ConstantFilterNode).dataType = type;
			}
		}
		this.calculateOutputType();
		super.childOutputTypeChanged(child);
	}

	get operator(): ArithmeticOperator {
		return this._operator;
	}

	set operator(value: ArithmeticOperator) {
		this._operator = value;
		if (!this.operator) {
			return;
		}
		while (this.operator.minOperandCount > this._children.length) {
			const child = new ConstantFilterNode(this);
			child.dataType = this._children[0].outputType;
			child.allowMultipleValues = this.operator.allowMultipleValues;
			this._children.push(child);
		}
		if (this.operator.maxOperandCount !== null && this.operator.maxOperandCount !== undefined &&
			this.operator.maxOperandCount < this._children.length) {
			this._children.splice(this.operator.maxOperandCount, this._children.length - this.operator.maxOperandCount);
		}
		this.calculateOutputType();
		this.parent.childOutputTypeChanged(this);
	}

	calculateOutputType() {
		if (!this._operator) {
			return;
		}
		const outputType = this._operandType && this.operator.dataTypeMap(this._operandType.dataType);
		if (!this._outputType || this.outputType.dataType !== outputType) {
			this.outputType = new HasTypeInfo(this._operandType && this._operandType.isNullable,
				outputType, null);
		}
	}

	setStorageNodeProperties(storage: StorageFilterNode) {
		storage.operator = this.operator.name;
	}

	applyStorageNode(storage: StorageFilterNode) {
		this.operators = ArithmeticOperator.Operators;
		this.operator = this.operators.find(x => x.name === storage.operator);
	}

	get nodeType(): FilterNodeType {
		return FilterNodeType.Arithmetic;
	}

	get children(): FilterNode[] {
		return this._children;
	}

	isEmpty(): boolean {
		return !this.operator && !this._children.find(x => !x.isEmpty());
	}

	isValid(): boolean {
		if (this.isEmpty()) {
			return true;
		}
		if (!this._operator) {
			return false;
		}
		return !this._children.find(x => !x.isValid());
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
		if (index === 0) {
			this.childOutputTypeChanged(newChild);
		}
	}

	addChild(constant: boolean) {
		if (this._operator &&
			(!this.operator.maxOperandCount || this._children.length < this._operator.maxOperandCount)) {
			if (constant) {
				const child = new ConstantFilterNode(this);
				child.dataType = this._operandType;
				this._children.push(child);
			} else {
				const child = new PropertyFilterNode(this);
				child.inputType = this.inputType;
				this._children.push(child);
			}
		}
	}

	removeChild(child: FilterNode) {
		if (!this._operator || this._children.length <= this._operator.minOperandCount) {
			return;
		}
		const index = this.children.indexOf(child);
		if (index === -1) {
			return;
		}
		this.children.splice(index, 1);
		if (index === 0 && this.children.length > 0) {
			this.childOutputTypeChanged(this.children[0]);
		}
	}

	toggleChildType(child: FilterNode) {
		const index = this._children.indexOf(child);
		if (index === -1) {
			return;
		}
		if (child.nodeType === FilterNodeType.Constant) {
			const newChild = new PropertyFilterNode(this);
			newChild.inputType = this.inputType;
			this._children[index] = newChild;
		} else {
			const newChild = new ConstantFilterNode(this);
			newChild.dataType = this.inputType;
			this._children[index] = newChild;
		}
	}

}
