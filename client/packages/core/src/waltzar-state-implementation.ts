import type {WaltzarConfig} from './waltzar-config';
import type {AppInstanceInformation} from './abstractions/app-instance-information';
import {BehaviorSubject, type Observable} from 'rxjs';
import {lazyRemoteNotLoaded, type LazyRemoteData} from './abstractions/lazy-remote-data';
import {MetadataModel} from './client-models/metadata-model';
import {postJson} from './helpers/http';
import {WaltzarState} from './abstractions/waltzar-state';
import {AuthenticationState} from './abstractions/authentication-state';
import {ContractConstants} from './helpers/contract-constants';
import {nextState} from './helpers/lazy-remote-data-state-machine';

export class WaltzarStateImplementation implements WaltzarState {
	private _appInstances$ = new BehaviorSubject<LazyRemoteData<AppInstanceInformation[]>>(lazyRemoteNotLoaded);
	private _appInstance$ = new BehaviorSubject<AppInstanceInformation | null>(null);
	private _metadataPackage$ = new BehaviorSubject<MetadataModel | null>(null);
	private _config: WaltzarConfig;
	private _authState: AuthenticationState;

	constructor(config: WaltzarConfig, authState: AuthenticationState) {
		this._authState = authState;
		this._config = config;
		this.fetchAppInstances();
	}

	reInitialize(config: WaltzarConfig) {
		this._config = config;
		this.fetchAppInstances();
	}

	private fetchAppInstances() {
		nextState({
			state$: this._appInstances$,
			fetcher: () => postJson<AppInstanceInformation[], void>({
				url: ContractConstants.getAppInstancesInfoForHome,
				state: this,
				body: undefined,
			})
		});
	}

	get availableAppInstances$() {return this._appInstances$;}
	get activeAppInstance$() {return this._appInstance$;}
	get metadataPackage$() {return this._metadataPackage$;}
	get config() {return this._config;}
	get authState() {return this._authState;}
}
