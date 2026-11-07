import {EntityTypeMetadata} from './metadata/entity-type-metadata';
import {FacetContainer} from '../abstractions/facets';
import {DataTypes} from './metadata/data-types';
import {FieldError} from '../contract-models/result';

export class PropertyBehavior {
	constructor(
		public behaviorName: string,
		public parameters: string,
	) { }
}

export class PropertyMetadata implements HasTypeInfo {
	constructor(
		public readonly name?: string,
		public readonly generalUsage?: string,
		public readonly dataType?: string,
		public readonly entityTypeName?: string,
		public readonly foreignKeyName?: string,
		public readonly inversePropertyName?: string,
		public readonly validationErrors?: FieldError[],
		public readonly entityType?: EntityTypeMetadata,
		public readonly inverseProperty?: PropertyMetadata,
		public readonly foreignKeyProperty?: PropertyMetadata,
		public readonly facetValues?: FacetContainer,
		public readonly title?: string,
		public readonly isNullable?: boolean,
		public readonly isExpression?: boolean,
		public readonly behaviors?: PropertyBehavior[],
	) {
	}

	getConstantType() {
		let type = this.dataType;
		if (type === DataTypes.ForeignKey || type === DataTypes.NavigationEntity) {
			type = this.entityType ? this.entityType.getPrimaryKey()!.dataType : undefined;
		}
		if (type && this.isNullable) {
			type += '?';
		}
		return type;
	}
}
