export class TypeBase {
	public static fields = [
		{jsName: 'name', title: 'Name', name: 'Name', dataType: 'string'},
		{jsName: 'schemaName', title: 'Schema', name: 'Schema Name', dataType: 'string'},
		{jsName: 'pluralTitle', title: 'Plural Title', name: 'Plural Title', dataType: 'string'},
		{jsName: 'singularTitle', title: 'Singular Title', name: 'Singular Title', dataType: 'string'},
		{
			jsName: 'entityGeneralUsageCategoryId',
			title: 'Usage Category',
			name: 'General Usage Category',
			dataType: 'entityCategory'
		},
		{jsName: 'codePath', title: 'Code Path', name: 'Code Path', dataType: 'string'},
		{
			jsName: 'displayNamePath',
			title: 'Display Name Path',
			name: 'Display Name Path',
			dataType: 'string'
		},

	];

	public codePath: string;
	public displayNamePath: string;
	public id: number;
	public name: string;
	public schemaName: string;
	public pluralTitle: string;
	public singularTitle: string;
	public entityGeneralUsageCategoryId: number;
}
