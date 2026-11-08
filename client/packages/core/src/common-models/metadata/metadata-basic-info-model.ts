import {GeneralUsageCategoryModel} from './general-usage-category-model';
import {DataTypeModel} from './data-type-model';
import {FacetDefinitionModel} from '../../abstractions/facets';

export type MetadataBasicInfoModel = {
	propertyFacetDefinitions: FacetDefinitionModel[];
	entityTypeFacetDefinitions: FacetDefinitionModel[];
	propertyGeneralUsageCategories: GeneralUsageCategoryModel[];
	dataTypes: DataTypeModel[];
	entityTypeGeneralUsageCategories: GeneralUsageCategoryModel[];
	defaultPropertyFacetValues: [string, [string, string]][];
	defaultEntityTypeFacetValues: [string, [string, string]][];
};
