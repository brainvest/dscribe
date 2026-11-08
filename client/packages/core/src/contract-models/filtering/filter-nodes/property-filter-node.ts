import {FilterNode} from './filter-node';
import {NavigationListFilterNode} from './navigation-list-filter-node';
import {StorageFilterNode} from '../storage-filter-node';
import {FilterNodeType} from '../filter-node-type';
import {HasTypeInfo, PropertyMetadata} from '../../../abstractions/metadata-abstractions';
import {DataTypes} from '../../../common-models/metadata/data-types';

export class PropertyFilterNode extends FilterNode {
	properties?: PropertyMetadata[];
	private _property?: PropertyMetadata;
	child?: FilterNode;

	constructor(parent: FilterNode) {
		super(parent);
		this.properties = parent.childInputType?.entityType?.getPropertiesForFilter();
	}

	get property(): PropertyMetadata | undefined {
		return this._property;
	}

	set property(value: PropertyMetadata | undefined) {
		this._property = value;
		if (!value) {
			this.child = undefined;
			this.outputType = undefined;
			this.parent.childOutputTypeChanged(this);
			return;
		}
		this.outputType = value.dataType === DataTypes.NavigationList ?
			{ isNullable: false, dataType: DataTypes.bool } :
			{ isNullable: value.isNullable, dataType: value.dataType, entityType: value.entityType };
		if (value.dataType === DataTypes.NavigationList) {
			const child = new NavigationListFilterNode(this);
			child.property = value;
			this.child = child;
		} else if (value.dataType === DataTypes.NavigationEntity) {
			this.child = new PropertyFilterNode(this);
		} else {
			this.child = undefined;
		}
		this.parent.childOutputTypeChanged(this);
	}

	get outputType() {
		if (this.child && this.child.outputType) {
			return this.child.outputType;
		}
		if (!this._property) {
			return undefined;
		}
		if (this._property.dataType === DataTypes.NavigationEntity) {
			return this._property.foreignKeyProperty;
		}
		return this._property;
	}

	set outputType(value: HasTypeInfo | undefined) {
	}

	setStorageNodeProperties(storage: StorageFilterNode) {
		if (this._property && this._property.dataType === DataTypes.NavigationEntity && !(this.child as PropertyFilterNode)._property) {
			storage.propertyName = this._property.foreignKeyName;
		} else {
			storage.propertyName = this._property?.name;
		}
	}

	applyStorageNode(storage: StorageFilterNode) {
		const property = this.properties?.find(x => x.name === storage.propertyName || x.foreignKeyName === storage.propertyName);
		if (property?.dataType === DataTypes.ForeignKey) {
			this.property = this.properties?.find(x => x.foreignKeyName === storage.propertyName);
		} else {
			this.property = property;
		}
	}

	get childInputType() {
		if (!this._property) {
			return undefined;
		}
		return this._property;
	}

	get nodeType(): FilterNodeType {
		return FilterNodeType.Property;
	}

	get children() {
		if (!this.child) {
			return [];
		}
		return [this.child];
	}

	isEmpty(): boolean {
		return !this.property;
	}

	isValid(): boolean {
		if (this.isEmpty()) {
			return true;
		}
		if (this._property?.dataType === DataTypes.NavigationList) {
			return !!this.child?.isValid();
		}
		return true;
	}
}
