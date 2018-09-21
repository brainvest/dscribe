import {Injectable} from '@angular/core';
import {DscribeConfig} from './models/dscribe-config';
import {AppInstanceInfoModel} from './common/models/app-instance-info-model';
import {BehaviorSubject, Observable} from 'rxjs';
import {DscribeCommand} from './models/dscribe-command';

@Injectable({
	providedIn: 'root'
})
export class DscribeService {
	private config = <DscribeConfig>{};
	private commands$: BehaviorSubject<DscribeCommand[]> = new BehaviorSubject<DscribeCommand[]>([]);

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

	getCommands(): Observable<DscribeCommand[]> {
		return this.commands$;
	}

	setCommands(value: DscribeCommand[]) {
		this.commands$.next(value);
	}
}
