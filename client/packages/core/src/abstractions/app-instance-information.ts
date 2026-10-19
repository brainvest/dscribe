export type AppInstanceInformation = {
	readonly id: number;
	readonly appTypeId: number;
	readonly appTypeName: string;
	readonly appTypeTitle: string;
	readonly isEnabled: boolean;
	readonly isProduction: boolean;
	readonly metadataReleaseReleaseTime?: string;
	readonly metadataReleaseVersion?: string;
	readonly metadataReleaseVersionCode?: number;
	readonly name: string;
	readonly title: string;
	readonly useUnreleasedMetadata: boolean;
};
