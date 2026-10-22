import {FacetContainerResponse} from '../../abstractions/facets';
import {EntityTypeMetadata} from '../../abstractions/metadata-abstractions';

export type PropertyDefaultsResponse = {
	name: string;
	defaults: FacetContainerResponse;
};

export type DigestTypesResponse = {
	digestEntityTypes: EntityTypeMetadata[];
	propertyDefaults: {
		root: PropertyDefaultsResponse, [usageCategory: string]: PropertyDefaultsResponse
	};
};

export type FacetResponse = {
	name: string;
	value: [boolean, number, string];
};

export type PropertyBehaviorResponse = {
	behaviorName: string;
	parameters: string;
};

export type PropertyResponse = {
	name: string;
	generalUsage: string;
	dataType: string;
	entityTypeName: string;
	localFacets: FacetContainerResponse;
	inversePropertyName: string;
	foreignKeyName: string;
	title: string;
	isNullable: boolean;
	isExpression: boolean;
	behaviors: PropertyBehaviorResponse[];
};

export type EntityTypeResponse = {
	name: string;
	code: string;
	displayName: string;
	primaryKey: string;
	singularTitle: string;
	pluralTitle: string;
	typeGeneralUsageCategoryId: number;
	properties: {[propertyName: string]: PropertyResponse};
};
