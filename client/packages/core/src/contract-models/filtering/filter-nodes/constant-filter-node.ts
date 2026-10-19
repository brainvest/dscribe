import {FilterNode} from './filter-node';
import {HasTypeInfo} from '../../../metadata/property-metadata';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterNodeType} from '../filter-node-type';
import {DataTypes} from '../../../metadata/data-types';

export class ConstantFilterNode extends FilterNode {
	values: { value: any }[] = [{value: null}];
	private _allowMultipleValues = false;
	private _dataType: HasTypeInfo;

	constructor(parent: FilterNode) {
		super(parent);
	}

	addValue() {
		this.values.push({value: null});
	}

	removeValueAt(index: number) {
		this.values.splice(index, 1);
	}

	get allowMultipleValues(): boolean {
		return this._allowMultipleValues;
	}

	set allowMultipleValues(value: boolean) {
		this._allowMultipleValues = value;
		if (!value) {
			if (this.values.length > 1) {
				this.values.splice(1, this.values.length - 1);
			}
		}
	}

	setStorageNodeProperties(storage: StorageFilterNode) {
		storage.values = this.values.map(x => x.value);
	}

	applyStorageNode(storage: StorageFilterNode) {
		this.values = storage.values.map(x => {
			return {
				value: x
			};
		});
	}

	get dataType() {
		return this._dataType;
	}

	set dataType(value: HasTypeInfo) {
		this._dataType = value;
		if (!value.IsNullable && value.DataType == DataTypes.bool && !this.values[0].value) {
			this.values[0].value = false;
		}
	}

	get nodeType(): FilterNodeType {
		return FilterNodeType.Constant;
	}

	get children(): FilterNode[] {
		return null;
	}

	isEmpty(): boolean {
		return false;
	}

	isValid(): boolean {
		return true;
	}

}
