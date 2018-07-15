import {PropertyBase} from '../../metadata/property-base';

export class AddNEditPropertyMetadataModel extends PropertyBase {
	foreignKeyAction: RelatedPropertyAction;
	newForeignKeyName: string;
	newForeignKeyId: number;

	inversePropertyAction: RelatedPropertyAction;
	newInversePropertyName: string;
	newInversePropertyId: number;
}

export enum RelatedPropertyAction {
	DontChange = 0,
	ChooseExistingById = 1,
	CreateNewByName = 2,
	RenameExisting = 3
}
