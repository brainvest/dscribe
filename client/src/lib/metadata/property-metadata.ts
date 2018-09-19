import {EntityMetadata} from './entity-metadata';
import {FacetContainer} from './facets/facet-container';
import {DataTypes} from './data-types';

export class HasTypeInfo {
	constructor(public isNullable?: boolean, public dataType?: string, public entityType?: EntityMetadata) {

	}
}

export class PropertyMetadata extends HasTypeInfo {

	constructor(public name?: string, public jsName?: string, public generalUsage?: string,
							public dataType?: string | null,
							public entityTypeName?: string, public foreignKeyName?: string,
							public inversePropertyName?: string, public validationErrors?: any[],
							public entityType?: EntityMetadata,
							public inverseProperty?: PropertyMetadata, public foreignKeyProperty?: PropertyMetadata,
							public facetValues?: FacetContainer, public title?: string, public isNullable?: boolean,
							public isExpression?: boolean) {
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
