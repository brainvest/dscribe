export type LocalFacetModel = {
	facetName: string;
	value: string;
};

export type EntityTypeBase = {
	codePath: string;
	displayNamePath: string;
	id: number;
	name: string;
	schemaName: string;
	pluralTitle: string;
	singularTitle: string;
	entityTypeGeneralUsageCategoryId: number;
	tableName: string;
	localFacets: LocalFacetModel[];
};

export const EntityTypeBaseFields = [
	{title: 'Name', name: 'Name', dataType: 'string'},
	{title: 'Schema', name: 'SchemaName', dataType: 'string'},
	{title: 'Plural Title', name: 'PluralTitle', dataType: 'string'},
	{title: 'Singular Title', name: 'SingularTitle', dataType: 'string'},
	{
		title: 'Usage Category',
		name: 'EntityTypeGeneralUsageCategoryId',
		dataType: 'entityCategory'
	},
	{title: 'Code Path', name: 'CodePath', dataType: 'string'},
	{
		title: 'Display Name Path',
		name: 'DisplayNamePath',
		dataType: 'string'
	},
];
