import type {Observable} from 'rxjs';
import type {LazyRemoteData} from './lazy-remote-data';
import type {AppInstanceInformation} from './app-instance-information';
import type {MetadataModel} from '../client-models/metadata-model';
import type {WaltzarConfig} from '../waltzar-config';
import type {AuthenticationState} from './authentication-state';

export interface WaltzarState {
	readonly availableAppInstances$: Observable<LazyRemoteData<AppInstanceInformation[]>>;
	readonly activeAppInstance$: Observable<AppInstanceInformation | null>;
	/** The metadata of the active app instance; loading again every time the active app instance changes. */
	readonly metadataPackage$: Observable<LazyRemoteData<MetadataModel>>;
	readonly config: WaltzarConfig;
	readonly authState: AuthenticationState;
	switchActiveAppInstance(app: AppInstanceInformation): void;
}
