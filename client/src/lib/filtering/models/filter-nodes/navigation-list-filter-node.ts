import {FilterNode} from './filter-node';
import {HasTypeInfo, PropertyMetadata} from '../../../metadata/property-metadata';
import {AggregationOperator} from '../aggregation-operator';
import {LambdaFilterNode} from './lambda-filter-node';
import {DataTypes} from '../../../metadata/data-types';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterNodeType} from '../filter-node-type';

export class NavigationListFilterNode extends FilterNode {
	private _property: PropertyMetadata;
	private _operator: AggregationOperator;
	operators: AggregationOperator[];
	filterSubNode: LambdaFilterNode;
	aggregationSelection: LambdaFilterNode;

	constructor(parent: FilterNode) {
		super(parent);
		this._outputType = this.getSelectionType();
	}

	get property() {
		return this._property;
	}

	set property(value: PropertyMetadata) {
		this._property = value;
		this.operators = AggregationOperator.Operators;
		if (this.operator && this.operators.indexOf(this._operator) === -1) {
			this.operator = this.operators[0];
		}
	}

	get hasFiltering(): boolean {
		return this._operator && this._operator.hasFiltering;
	}

	get hasAggregationSelection(): boolean {
		return this._operator && this._operator.hasSelection;
	}

	public getSelectionType(): HasTypeInfo {
		if (!this.operator || this.operator.isBoolean) {
			return new HasTypeInfo(false, DataTypes.bool);
		}
		if (!this.operator.hasSelection) {
			return new HasTypeInfo(false, this.operator.dataTypeMap['_']);
		}
		const type = this.aggregationSelection && this.aggregationSelection.outputType;
		if (type) {
			return new HasTypeInfo(true, this.operator.dataTypeMap[type.dataType]);
		}
	}

	get operator(): AggregationOperator {
		return this._operator;
	}

	set operator(value: AggregationOperator) {
		this._operator = value;
		if (this.hasAggregationSelection) {
			if (!this.aggregationSelection) {
				this.aggregationSelection = new LambdaFilterNode(this, this.property.entityType, true);
			}
		} else if (this.aggregationSelection) {
			this.aggregationSelection = null;
		}

		if (this.hasFiltering) {
			if (!this.filterSubNode) {
				this.filterSubNode = new LambdaFilterNode(this, this.property.entityType, false);
				this.filterSubNode.title = 'Condition on members';
			}
		} else if (this.filterSubNode) {
			this.filterSubNode = null;
		}
		this.outputType = this.getSelectionType();
	}

	setStorageNodeProperties(storage: StorageFilterNode) {
		storage.operator = this.operator.name;
	}

	applyStorageNode(storage: StorageFilterNode) {
		this.operator = this.operators.find(x => x.name === storage.operator);
	}

	get inputType() {
		return this._inputType;
	}

	set inputType(value: HasTypeInfo) {
		this._inputType = value;
		for (const child of this.children) {
			if (child) {
				child.inputType = value;
			}
		}
	}

	childOutputTypeChanged(child: FilterNode) {
		if (child === this.aggregationSelection) {
			this.outputType = child.outputType;
		}
		super.childOutputTypeChanged(child);
	}

	get children(): FilterNode[] {
		return [this.filterSubNode, this.aggregationSelection];
	}

	get nodeType(): FilterNodeType {
		return FilterNodeType.NavigationList;
	}

	isEmpty(): boolean {
		return !this.operator;
	}

	isValid(): boolean {
		return (!this.hasFiltering || this.filterSubNode.isValid())
			&& (!this.hasAggregationSelection || this.aggregationSelection.isValid());
	}
}
