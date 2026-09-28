import {FacetResponse} from '../response-models';

export interface FacetContainerResponse {
	[facetName: string]: FacetResponse;
}
