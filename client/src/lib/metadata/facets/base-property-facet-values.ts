import {FacetContainer} from './facet-container';

export interface BasePropertyFacetValues {
	root: FacetContainer;

	[usageCategory: string]: FacetContainer;
}
