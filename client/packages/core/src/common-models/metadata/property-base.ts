export type LocalFacetModel = {
	facetName: string;
	value: string;
};

export type PropertyBase = {
	id: number;
	dataTypeId: number;
	isNullable: boolean;
	name: string;
	propertyGeneralUsageCategoryId: number;
	ownerEntityTypeId: number;
	dataEntityTypeId: number;
	foreignKeyPropertyId: number;
	inversePropertyId: number;
	title: string;
	localFacets: LocalFacetModel[];
};
