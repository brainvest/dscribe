import {Injectable} from '@angular/core';
import {DscribeConfig} from './models/dscribe-config';
import {AppInstanceInfoModel} from './common/models/app-instance-info-model';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {DscribeCommand} from './models/dscribe-command';

@Injectable({
	providedIn: 'root'
})
export class DscribeService {
	private config = <DscribeConfig>{};
	private commands$: BehaviorSubject<DscribeCommand[]> = new BehaviorSubject<DscribeCommand[]>([]);

	appInstance$ = new ReplaySubject<AppInstanceInfoModel>(1);

	set authHeaderFetcher(fetcher: () => string) {
		this.config.authHeaderFetcher = fetcher;
	}

	get authHeaderFetcher(): () => string {
		return this.config.authHeaderFetcher;
	}

	set appInstance(instance: AppInstanceInfoModel) {
		this.config.appInstance = instance;
		this.appInstance$.next(instance);
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

	getServerRoot() {
		return this.config.serverRoot || '';
	}

	setServerRoot(value: string) {
		this.config.serverRoot = value;
	}

	url(relativeToRoot: string) {
		const server = this.config.serverRoot || '';
		if (server.endsWith('/')) {
			if (relativeToRoot.startsWith('/')) {
				return server + relativeToRoot.substring(1);
			} else {
				return server + relativeToRoot;
			}
		} else {
			if (relativeToRoot.startsWith('/')) {
				return server + relativeToRoot;
			} else {
				return server + '/' + relativeToRoot;
			}
		}
	}
}
