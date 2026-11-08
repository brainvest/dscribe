export type AppInstanceModel = {
	id: number;
	appTypeId: number;
	appTypeName: string;
	appTypeTitle: string;
	isEnabled: boolean;
	isProduction: boolean;
	metadataReleaseReleaseTime: string;
	metadataReleaseVersion: string;
	metadataReleaseVersionCode: number;
	name: string;
	title: string;
	useUnreleasedMetadata: boolean;
	dataConnectionStringTemplateName: string;
	mainDatabaseName: string;
	lobConnectionStringTemplateName: string;
	lobDatabaseName: string;
	loadBusinessFromAssemblyName: string;
	databaseProviderId: number;
	migrateDatabase: boolean;
};

// Shape of ASP.NET Core ModelState validation errors: each field maps to its list of error messages.
export type AppInstanceModelErrors = { [K in keyof AppInstanceModel]?: string[] };

