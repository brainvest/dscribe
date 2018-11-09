import { ConnectionStringModel } from './connection-string.model';

export class AppInstanceInfoModel {
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
	dataConnectionString: ConnectionStringModel;

	constructor() {
		this.isEnabled = true;
		this.dataConnectionString = new ConnectionStringModel();
	}
}

