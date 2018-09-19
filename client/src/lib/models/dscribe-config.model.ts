import {AppInstanceInfoModel} from '../common/models/app-instance-info-model';

export interface DscribeConfigModel {
	appInstanceId: number;
	appInstance: AppInstanceInfoModel;
	authHeaderFetcher: () => string;
}
