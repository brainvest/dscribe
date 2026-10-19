import { EntityTypeMetadata } from './entity-type-metadata';
import { FacetContainer } from '../../abstractions/facets';
import { DataTypes } from './data-types';
import { FieldError } from '../../contract-models/result';

export class HasTypeInfo {
	constructor(
		public isNullable?: boolean,
		public dataType?: string,
		public entityType?: EntityTypeMetadata,
	) {}
}

export class PropertyBehavior {
	constructor(
		public behaviorName: string,
		public parameters: string,
	) {}
}

export class PropertyMetadata extends HasTypeInfo {
	constructor(
		public name?: string,
		public generalUsage?: string,
		dataType?: string,
		public entityTypeName?: string,
		public foreignKeyName?: string,
		public inversePropertyName?: string,
		public validationErrors?: FieldError[],
		public entityType?: EntityTypeMetadata,
		public inverseProperty?: PropertyMetadata,
		public foreignKeyProperty?: PropertyMetadata,
		public facetValues?: FacetContainer,
		public title?: string,
		isNullable?: boolean,
		public isExpression?: boolean,
		public behaviors?: PropertyBehavior[],
	) {
		super(isNullable, dataType);
	}

	getConstantType() {
		let type = this.dataType;
		if (type === DataTypes.ForeignKey || type === DataTypes.NavigationEntity) {
			type = this.entityType ? this.entityType.getPrimaryKey().dataType : null;
		}
		if (this.isNullable) {
			type += '?';
		}
		return type;
	}
}
