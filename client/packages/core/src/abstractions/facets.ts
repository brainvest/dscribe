import {FacetResponse} from "../common-models/metadata/response-models";

export type LocalFacetsModel = {
	localFacets: [string, [string, string]];
};

export const KnownFacets = {
	HideInList: 'HideInList',
	HideInEdit: 'HideInEdit',
	HideInInsert: 'HideInInsert',
} as const;

export type FacetDefinitionModel = {
	id: number;
	name: string;
	dataType: string;
	default: string;
};

export interface FacetContainer {
	[facetName: string]: [boolean, number, string];
}

export type FacetContainerResponse = {
	[facetName: string]: FacetResponse;
};

export interface BasePropertyFacetValues {
	root: FacetContainer;
	[usageCategory: string]: FacetContainer;
}
