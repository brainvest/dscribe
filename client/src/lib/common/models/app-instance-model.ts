import { ConnectionStringModel } from './connection-string.model';

export class AppInstanceModel {
	Id: number;
	AppTypeId: number;
	AppTypeName: string;
	AppTypeTitle: string;
	IsEnabled: boolean;
	IsProduction: boolean;
	MetadataReleaseReleaseTime: string;
	MetadataReleaseVersion: string;
	MetadataReleaseVersionCode: number;
	Name: string;
	Title: string;
	UseUnreleasedMetadata: boolean;
	DataConnectionString: ConnectionStringModel;
	DatabaseProviderId: number;
}

