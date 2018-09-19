import {Injectable} from '@angular/core';
import {DscribeConfigModel} from './models/dscribe-config.model';
import {AppInstanceInfoModel} from './common/models/app-instance-info-model';

@Injectable({
	providedIn: 'root'
})
export class DscribeService {
	private config = <DscribeConfigModel>{};

	set authHeaderFetcher(fetcher: () => string) {
		this.config.authHeaderFetcher = fetcher;
	}

	get authHeaderFetcher(): () => string {
		return this.config.authHeaderFetcher;
	}

	set appInstance(instance: AppInstanceInfoModel) {
		this.config.appInstance = instance;
	}

	get appInstance(): AppInstanceInfoModel {
		return this.config.appInstance;
	}
}
