import {EntityTypeMetadata} from './entity-type-metadata';
import {FacetContainer} from './facets/facet-container';
import {DataTypes} from './data-types';
import {FieldError} from '../common/models/Result';

export class HasTypeInfo {
	constructor(public IsNullable?: boolean, public DataType?: string, public EntityType?: EntityTypeMetadata) {

	}
}

export class PropertyMetadata extends HasTypeInfo {

	constructor(public Name?: string, public GeneralUsage?: string,
							public DataType?: string | null,
							public EntityTypeName?: string, public ForeignKeyName?: string,
							public InversePropertyName?: string, public ValidationErrors?: FieldError[],
							public EntityType?: EntityTypeMetadata,
							public InverseProperty?: PropertyMetadata, public ForeignKeyProperty?: PropertyMetadata,
							public FacetValues?: FacetContainer, public Title?: string, public IsNullable?: boolean,
							public IsExpression?: boolean) {
		super(IsNullable, DataType);
	}

	getConstantType() {
		let type = this.DataType;
		if (type === DataTypes.ForeignKey || type === DataTypes.NavigationEntity) {
			type = this.EntityType ? this.EntityType.getPrimaryKey().DataType : null;
		}
		if (this.IsNullable) {
			type += '?';
		}
		return type;
	}
}
