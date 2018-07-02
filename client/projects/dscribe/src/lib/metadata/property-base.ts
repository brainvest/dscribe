export class PropertyBase {
	public static fields = [
		{jsName: 'name', title: 'Name', name: 'Name', dataType: 'string'},
		{jsName: 'dataTypeId', title: 'Data Type', name: 'Data Type', dataType: 'propertyDataType'},
		{
			jsName: 'dataTypeEntityId',
			title: 'Data Type Entity',
			name: 'Data Type Entity',
			dataType: 'dataTypeEntity'
		},
		{
			jsName: 'foreignKeyPropertyId',
			title: 'Foreign Key',
			name: 'Foreign Key Property',
			dataType: 'foreignKeyProperty'
		},
		{
			jsName: 'inversePropertyId',
			title: 'Inverse Property',
			name: 'Inverse Property',
			dataType: 'inverseProperty'
		},
		{
			jsName: 'propertyGeneralUsageCategoryId',
			title: 'Usage Category',
			name: 'General Usage Category',
			dataType: 'propertyCategory'
		},
		{jsName: 'isNullable', title: 'قابل خالی گذاشتن', name: 'nullable', dataType: 'bool'},
	];

	public id: number;
	public dataTypeId: number;
	public isNullable: boolean;
	public name: string;
	public propertyGeneralUsageCategoryId: number;
	public ownerEntityId: number;
	public dataTypeEntityId: number;
	public foreignKeyPropertyId: number;
	public inversePropertyId: number;
}
