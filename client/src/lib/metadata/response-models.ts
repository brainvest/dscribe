import {EntityTypeMetadata} from './entity-type-metadata';
import {FacetContainerResponse} from './facets/facet-container-response';

export class PropertyDefaultsResponse {
	Name: string;
	Defaults: FacetContainerResponse;
}

export class DigestTypesResponse {
	digestEntityTypes: EntityTypeMetadata[];
	propertyDefaults: {
		root: PropertyDefaultsResponse, [usageCategory: string]: PropertyDefaultsResponse
	};
}

export class FacetResponse {
	Name: string;
	Value: [boolean, number, string];
}

export class PropertyBehaviorResponse {
	BehaviorName: string;
	Parameters: string;
}

export class PropertyResponse {
	Name: string;
	GeneralUsage: string;
	DataType: string;
	EntityTypeName: string;
	LocalFacets: FacetContainerResponse;
	InversePropertyName: string;
	ForeignKeyName: string;
	Title: string;
	IsNullable: boolean;
	IsExpression: boolean;
	Behaviors: PropertyBehaviorResponse[];
}

export class EntityTypeResponse {
	Name: string;
	Code: string;
	DisplayName: string;
	PrimaryKey: string;
	SingularTitle: string;
	PluralTitle: string;
	TypeGeneralUsageCategoryId: number;
	Properties: { [propertyName: string]: PropertyResponse };
}
