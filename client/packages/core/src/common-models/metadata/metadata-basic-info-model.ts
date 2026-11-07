import {FacetDefinitionModel} from './facets/facet-definition-model';
import {GeneralUsageCategoryModel} from './general-usage-category-model';
import {DataTypeModel} from './data-type-model';

export class MetadataBasicInfoModel {
	PropertyFacetDefinitions: FacetDefinitionModel[];
	EntityTypeFacetDefinitions: FacetDefinitionModel[];
	PropertyGeneralUsageCategories: GeneralUsageCategoryModel[];
	DataTypes: DataTypeModel[];
	EntityTypeGeneralUsageCategories: GeneralUsageCategoryModel[];
	DefaultPropertyFacetValues: [string, [string, string]][];
	DefaultEntityTypeFacetValues: [string, [string, string]][];
}
