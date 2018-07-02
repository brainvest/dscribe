import {EntityMetadata} from './entity-metadata';
import {FacetContainerResponse} from './facets/facet-container-response';

export class DigestTypesResponse {
	digestTypes: EntityMetadata[];
	propertyDefaults: {
		root: PropertyDefaultsResponse, [usageCategory: string]: PropertyDefaultsResponse
	};
}

export class PropertyDefaultsResponse {
	name: string;
	defaults: FacetContainerResponse;
}

export class FacetResponse {
	name: string;
	value: [boolean, number, string];
}

export class TypeResponse {
	name: string;
	code: string;
	displayName: string;
	primaryKey: string;
	singularTitle: string;
	pluralTitle: string;
	typeGeneralUsageCategoryId: number;
	properties: { [propertyName: string]: PropertyResponse };
}

export class PropertyResponse {
	name: string;
	jsName: string;
	generalUsage: string;
	dataType: string;
	entityTypeName: string;
	localFacets: FacetContainerResponse;
	inversePropertyName: string;
	foreignKeyName: string;
	title: string;
	isNullable: boolean;
	isExpression: boolean;
}
