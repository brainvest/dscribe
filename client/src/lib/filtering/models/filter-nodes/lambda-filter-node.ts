import {FilterNode} from './filter-node';
import {ParameterInfo} from '../parameter-info';
import {EntityMetadata} from '../../../metadata/entity-metadata';
import {HasTypeInfo} from '../../../metadata/property-metadata';
import {DataTypes} from '../../../metadata/data-types';
import {FilterNodeType} from '../filter-node-type';
import {StorageFilterNode} from '../storage-filter-node';

export class LambdaFilterNode extends FilterNode {
	parameter: ParameterInfo;
	private _body: FilterNode;

	constructor(parent: FilterNode, public entityType: EntityMetadata, private _isValueSelection) {
		super(parent);
		this.inputType = new HasTypeInfo(true, DataTypes.NavigationList, entityType);
		this._body = FilterNode.factory.create(_isValueSelection ? FilterNodeType.Property : FilterNodeType.Comparison, this);
		this.parameter = new ParameterInfo(this.findParameterName(), entityType.name);
	}

	private findParameterName(): string {
		const existingParameters = this.getTreeParameters();
		const name = this.entityType.name[0].toLowerCase();
		if (!existingParameters.find(x => x.name === name)) {
			return name;
		}
		for (let i = 2; ; i++) {
			const n = name + i;
			if (!existingParameters.find(x => x.name === n)) {
				return n;
			}
		}
	}

	setStorageNodeProperties(storage: StorageFilterNode) {
		storage.parameterName = this.parameter.name;
		storage.dataType = this.parameter.typeName;
	}

	applyStorageNode(storage: StorageFilterNode) {
		this.parameter.name = storage.parameterName;
		this.parameter.typeName = storage.dataType;
	}

	get inputType() {
		return this._inputType;
	}

	set inputType(value: HasTypeInfo) {
		this._inputType = value;
		if (this._body) {
			this._body.inputType = value;
		}
	}

	childOutputTypeChanged(child: FilterNode) {
		this.outputType = child.outputType;
		if (this.parent) {
			this.parent.childOutputTypeChanged(this);
		}
	}

	get nodeType(): FilterNodeType {
		return FilterNodeType.Lambda;
	}

	get children(): FilterNode[] {
		return [this._body];
	}

	isValueSelection() {
		return this._isValueSelection;
	}

	isEmpty(): boolean {
		return this._body.isEmpty();
	}

	isValid(): boolean {
		return this._body.isValid();
	}

	canReplaceChild() {
		return true;
	}

	replaceChild(oldChild: FilterNode, newChild: FilterNode) {
		this._body = newChild;
	}
}
