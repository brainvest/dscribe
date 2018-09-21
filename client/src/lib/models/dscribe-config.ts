import {AppInstanceInfoModel} from '../common/models/app-instance-info-model';

export interface DscribeConfig {
	appInstanceId: number;
	appInstance: AppInstanceInfoModel;
	authHeaderFetcher: () => string;
}
