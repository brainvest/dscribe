export class DataTypeModel {
	Id: number;
	Name: string;
	Identifier: string;

	static NavigationalDataTypeIds: { [Key: string]: number } = {
		ForeignKey: 7,
		NavigationProperty: 8,
		NavigationList: 10
	};
}
