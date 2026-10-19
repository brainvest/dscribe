import {FilterNode} from './filter-node';
import {HasTypeInfo, PropertyMetadata} from '../../../metadata/property-metadata';
import {DataTypes} from '../../../metadata/data-types';
import {NavigationListFilterNode} from './navigation-list-filter-node';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterNodeType} from '../filter-node-type';

export class PropertyFilterNode extends FilterNode {
	properties: PropertyMetadata[];
	private _property: PropertyMetadata;
	child: FilterNode;

	constructor(parent: FilterNode) {
		super(parent);
		this.properties = this.parent.childInputType.EntityType.getPropertiesForFilter();
	}

	get property(): PropertyMetadata {
		return this._property;
	}

	set property(value: PropertyMetadata) {
		this._property = value;
		if (!value) {
			this.child = null;
			this.outputType = null;
			this.parent.childOutputTypeChanged(this);
			return;
		}
		this.outputType = value.DataType === DataTypes.NavigationList ?
			new HasTypeInfo(false, DataTypes.bool, null) :
			new HasTypeInfo(value.IsNullable, value.DataType, value.EntityType);
		if (value.DataType === DataTypes.NavigationList) {
			const child = new NavigationListFilterNode(this);
			child.property = value;
			this.child = child;
		} else if (value.DataType === DataTypes.NavigationEntity) {
			this.child = new PropertyFilterNode(this);
		} else {
			this.child = null;
		}
		this.parent.childOutputTypeChanged(this);
	}

	get outputType() {
		if (this.child && this.child.outputType) {
			return this.child.outputType;
		}
		if (!this._property) {
			return null;
		}
		if (this._property.DataType === DataTypes.NavigationEntity) {
			return this._property.ForeignKeyProperty;
		}
		return this._property;
	}

	set outputType(value: HasTypeInfo) {
	}

	setStorageNodeProperties(storage: StorageFilterNode) {
		if (this._property && this.property.DataType === DataTypes.NavigationEntity && !(this.child as PropertyFilterNode)._property) {
			storage.propertyName = this._property.ForeignKeyName;
		} else {
			storage.propertyName = this.property.Name;
		}
	}

	applyStorageNode(storage: StorageFilterNode) {
		const property = this.properties.find(x => x.Name === storage.propertyName || x.ForeignKeyName === storage.propertyName);
		if (property.DataType === DataTypes.ForeignKey) {
			this.property = this.properties.find(x => x.ForeignKeyName === storage.propertyName);
		} else {
			this.property = property;
		}
	}

	get childInputType() {
		if (!this._property) {
			return null;
		}
		return this._property;
	}

	get nodeType(): FilterNodeType {
		return FilterNodeType.Property;
	}

	get children() {
		return [this.child];
	}

	isEmpty(): boolean {
		return !this.property;
	}

	isValid(): boolean {
		if (this.isEmpty()) {
			return true;
		}
		if (this.property.DataType === DataTypes.NavigationList) {
			return this.child.isValid();
		}
		return true;
	}
}
