import {Injectable, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {EntityTypeMetadata, WaltzarState} from '@waltzar/core';
import {WALTZAR_STATE} from '../app.config';

/**
 * The application the end user is working in, and the metadata (forms) it defines. Thin signal view over
 * `WaltzarState`, which owns the loading; nothing is loaded until an application is picked in the switcher.
 */
@Injectable({providedIn: 'root'})
export class ActiveApp {
	private readonly state: WaltzarState = inject(WALTZAR_STATE);

	readonly appInstance = toSignal(this.state.activeAppInstance$, {initialValue: null});
	readonly metadata = toSignal(this.state.metadataPackage$, {requireSync: true});

	/** Every form (entity type) of the active application; empty until its metadata has loaded. */
	readonly forms = computed<readonly EntityTypeMetadata[]>(() => {
		const metadata = this.metadata();
		return metadata.state === 'loaded' ? metadata.value.getEntityTypes() : [];
	});

	formByName(name: string): EntityTypeMetadata | undefined {
		const metadata = this.metadata();
		return metadata.state === 'loaded' ? metadata.value.getEntityTypeByName(name) : undefined;
	}
}
