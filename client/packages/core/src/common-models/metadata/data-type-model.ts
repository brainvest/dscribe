export type DataTypeModel = {
	id: number;
	name: string;
	identifier: string;
};

export const NavigationalDataTypeIds: { [Key: string]: number } = {
	ForeignKey: 7,
	NavigationProperty: 8,
	NavigationList: 10
};
