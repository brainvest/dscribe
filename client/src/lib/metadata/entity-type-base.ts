export class EntityTypeBase {
	public static fields = [
		{ title: 'Name', name: 'Name', dataType: 'string' },
		{ title: 'Schema', name: 'SchemaName', dataType: 'string' },
		{ title: 'Plural Title', name: 'PluralTitle', dataType: 'string' },
		{ title: 'Singular Title', name: 'SingularTitle', dataType: 'string' },
		{
			title: 'Usage Category',
			name: 'EntityTypeGeneralUsageCategoryId',
			dataType: 'entityCategory'
		},
		{ title: 'Code Path', name: 'CodePath', dataType: 'string' },
		{
			title: 'Display Name Path',
			name: 'DisplayNamePath',
			dataType: 'string'
		},

	];

	public CodePath: string;
	public DisplayNamePath: string;
	public Id: number;
	public Name: string;
	public SchemaName: string;
	public PluralTitle: string;
	public SingularTitle: string;
	public EntityTypeGeneralUsageCategoryId: number;
	public TableName: string;
}
