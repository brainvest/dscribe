import {PropertyBase} from '../../metadata/property-base';

export class AddNEditPropertyMetadataModel extends PropertyBase {
	foreignKeyAction: RelatedPropertyAction;
	newForeignKeyName: string;
	newForeignKeyId: number;

	inversePropertyAction: RelatedPropertyAction;
	newInversePropertyName: string;
	newInversePropertyTitle: string;
	newInversePropertyId: number;
}

export enum RelatedPropertyAction {
	DontChange = 1,
	ChooseExistingById = 2,
	CreateNewByName = 3,
	RenameExisting = 4
}
