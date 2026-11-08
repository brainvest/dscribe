import {FacetContainer} from '../../abstractions/facets';
import {DataTypes} from './data-types';
import {FieldError} from '../../contract-models/result';
import {EntityTypeMetadata, HasTypeInfo, PropertyBehavior, PropertyMetadata} from '../../abstractions/metadata-abstractions';

export class PropertyMetadataImplementation implements HasTypeInfo, PropertyMetadata {
	constructor(
		public name?: string,
		public generalUsage?: string,
		public dataType?: string,
		public entityTypeName?: string,
		public foreignKeyName?: string,
		public inversePropertyName?: string,
		public validationErrors?: FieldError[],
		public entityType?: EntityTypeMetadata,
		public inverseProperty?: PropertyMetadata,
		public foreignKeyProperty?: PropertyMetadata,
		public facetValues?: FacetContainer,
		public title?: string,
		public isNullable?: boolean,
		public isExpression?: boolean,
		public behaviors?: PropertyBehavior[],
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
