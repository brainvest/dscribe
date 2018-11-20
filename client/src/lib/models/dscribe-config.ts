import {AppInstanceInformation} from '../common/models/app-instance-information';

export interface DscribeConfig {
	appInstanceId: number;
	appInstance: AppInstanceInformation;
	authHeaderFetcher: () => string;
	serverRoot: string;
}
