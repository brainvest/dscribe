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
	DataConnectionStringTemplateName: string;
	MainDatabaseName: string;
	LobConnectionStringTemplateName: string;
	LobDatabaseName: string;
	LoadBusinessFromAssemblyName: string;
	DatabaseProviderId: number;
	MigrateDatabase: boolean;
}

// Shape of ASP.NET Core ModelState validation errors: each field maps to its list of error messages.
export type AppInstanceModelErrors = { [K in keyof AppInstanceModel]?: string[] };

