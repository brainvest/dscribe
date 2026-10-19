import type {Observable} from 'rxjs';
import type {LazyRemoteData} from './lazy-remote-data';
import type {AppInstanceInformation} from './app-instance-information';
// import type {MetadataModel} from '../client-models/metadata-model';
import type {WaltzarConfig} from '../waltzar-config';
import type {AuthenticationState} from './authentication-state';

export interface WaltzarState {
	readonly availableAppInstances$: Observable<LazyRemoteData<AppInstanceInformation[]>>;
	readonly activeAppInstance$: Observable<AppInstanceInformation | null>;
	// readonly metadataPackage$: Observable<MetadataModel | null>;
	readonly config: WaltzarConfig;
	readonly authState: AuthenticationState;
}
