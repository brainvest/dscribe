import {PropertyBase} from '../../metadata/property-base';

export class AddNEditPropertyMetadataModel extends PropertyBase {
	ForeignKeyAction: RelatedPropertyAction;
	NewForeignKeyName: string;
	NewForeignKeyId: number;

	InversePropertyAction: RelatedPropertyAction;
	NewInversePropertyName: string;
	NewInversePropertyTitle: string;
	NewInversePropertyId: number;
}

export enum RelatedPropertyAction {
	DontChange = 1,
	ChooseExistingById = 2,
	CreateNewByName = 3,
	RenameExisting = 4
}
