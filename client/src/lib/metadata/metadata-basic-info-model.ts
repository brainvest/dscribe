import {FacetDefinitionModel} from './facets/facet-definition-model';
import {GeneralUsageCategoryModel} from './general-usage-category-model';
import {DataTypeModel} from './data-type-model';

export class MetadataBasicInfoModel {
	propertyFacetDefinitions: FacetDefinitionModel[];
	entityTypeFacetDefinitions: FacetDefinitionModel[];
	propertyGeneralUsageCategories: GeneralUsageCategoryModel[];
	dataTypes: DataTypeModel[];
	entityTypeGeneralUsageCategories: GeneralUsageCategoryModel[];
	defaultPropertyFacetValues: [string, [string, string]][];
	defaultEntityTypeFacetValues: [string, [string, string]][];
}
