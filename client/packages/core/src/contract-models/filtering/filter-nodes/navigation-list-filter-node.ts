import {FilterNode} from './filter-node';
import {AggregationOperator} from '../aggregation-operator';
import {LambdaFilterNode} from './lambda-filter-node';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterNodeType} from '../filter-node-type';
import {HasTypeInfo, PropertyMetadata} from '../../../abstractions/metadata-abstractions';
import {DataTypes} from '../../../common-models/metadata/data-types';

export class NavigationListFilterNode extends FilterNode {
	private _property?: PropertyMetadata;
	private _operator?: AggregationOperator;
	operators?: AggregationOperator[];
	filterSubNode?: LambdaFilterNode;
	aggregationSelection?: LambdaFilterNode;

	constructor(parent: FilterNode) {
		super(parent);
		this._outputType = this.getSelectionType();
	}

	get property() {
		return this._property;
	}

	set property(value: PropertyMetadata | undefined) {
		this._property = value;
		this.operators = AggregationOperator.Operators;
		if (this._operator && this.operators.indexOf(this._operator) === -1) {
			this.operator = this.operators[0];
		}
	}

	get hasFiltering(): boolean {
		return !!this._operator && this._operator.hasFiltering;
	}

	get hasAggregationSelection(): boolean {
		return !!this._operator && this._operator.hasSelection;
	}

	public getSelectionType(): HasTypeInfo | undefined {
		if (!this._operator || this._operator.isBoolean) {
			return {isNullable: false, dataType: DataTypes.bool};
		}
		if (!this._operator.hasSelection) {
			return {isNullable: false, dataType: this._operator.dataTypeMap?.['_']};
		}
		const type = this.aggregationSelection && this.aggregationSelection.outputType;
		if (type) {
			return {isNullable: true, dataType: type.dataType && this._operator.dataTypeMap?.[type.dataType]};
		}
		return undefined;
	}

	get operator(): AggregationOperator | undefined {
		return this._operator;
	}

	set operator(value: AggregationOperator | undefined) {
		this._operator = value;
		if (this.hasAggregationSelection) {
			if (!this.aggregationSelection && this.property?.entityType) {
				this.aggregationSelection = new LambdaFilterNode(this, this.property?.entityType, true);
			}
		} else if (this.aggregationSelection) {
			this.aggregationSelection = undefined;
		}

		if (this.hasFiltering) {
			if (!this.filterSubNode && this.property?.entityType) {
				this.filterSubNode = new LambdaFilterNode(this, this.property?.entityType, false);
				this.filterSubNode.title = 'Condition on members';
			}
		} else if (this.filterSubNode) {
			this.filterSubNode = undefined;
		}
		this.outputType = this.getSelectionType();
	}

	setStorageNodeProperties(storage: StorageFilterNode) {
		storage.operator = this.operator?.name;
	}

	applyStorageNode(storage: StorageFilterNode) {
		this.operator = this.operators?.find(x => x.name === storage.operator);
	}

	get inputType() {
		return this._inputType;
	}

	set inputType(value: HasTypeInfo | undefined) {
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
		const result = [];
		if (this.filterSubNode) {
			result.push(this.filterSubNode);
		}
		if (this.aggregationSelection) {
			result.push(this.aggregationSelection);
		}
		return result;
	}

	get nodeType(): FilterNodeType {
		return FilterNodeType.NavigationList;
	}

	isEmpty(): boolean {
		return !this.operator;
	}

	isValid(): boolean {
		return (!this.hasFiltering || this.filterSubNode?.isValid() == true)
			&& (!this.hasAggregationSelection || this.aggregationSelection?.isValid() == true);
	}
}
