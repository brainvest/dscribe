export class DataTypeModel {
	id: number;
	name: string;
	identifier: string;

	static NavigationalDataTypeIds: { [key: string]: number } = {
		foreignKey: 7,
		navigationProperty: 8,
		navigationList: 10
	};
}
