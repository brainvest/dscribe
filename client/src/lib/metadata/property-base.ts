export class PropertyBase {
	Id: number;
	DataTypeId: number;
	IsNullable: boolean;
	Name: string;
	PropertyGeneralUsageCategoryId: number;
	OwnerEntityTypeId: number;
	DataEntityTypeId: number;
	ForeignKeyPropertyId: number;
	InversePropertyId: number;
	Title: string;
	LocalFacets: LocalFacetModel[];
}

export class LocalFacetModel {
	FacetName: string;
	Value: string;
}
