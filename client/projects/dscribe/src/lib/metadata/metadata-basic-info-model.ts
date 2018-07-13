import {FacetDefinitionModel} from './facets/facet-definition-model';
import {GeneralUsageCategoryModel} from './general-usage-category-model';
import {DataTypeModel} from './data-type-model';

export class MetadataBasicInfoModel {
	propertyFacetDefinitions: FacetDefinitionModel[];
	entityFacetDefinitions: FacetDefinitionModel[];
	propertyGeneralUsageCategories: GeneralUsageCategoryModel[];
	dataTypes: DataTypeModel[];
	entityGeneralUsageCategories: GeneralUsageCategoryModel[];
	defaultPropertyFacetValues: [string, [string, string]][];
	defaultEntityFacetValues: [string, [string, string]][];
}
