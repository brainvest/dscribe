import {Component, inject, signal} from '@angular/core';
import {RemoteContentDirective, RemoteRegionComponent} from '@waltzar/angular-lib';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Auth} from '../../core/auth/auth';
import {DrawerItem, USER_DRAWER} from '../../core/navigation';
import {ActiveApp} from '../../core/active-app';
import {Theme} from '../../core/theme';
import {WALTZAR_STATE} from '../../app.config';
import {AppInstanceInformation, WaltzarState} from '@waltzar/core';
import {toSignal} from '@angular/core/rxjs-interop';

const PIN_STORAGE_KEY = 'ui-template.user-nav-pinned';

@Component({
	selector: 'app-user-shell',
	imports: [
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		MatSidenavModule,
		MatToolbarModule,
		MatListModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatBadgeModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
		RemoteRegionComponent,
		RemoteContentDirective,
	],
	templateUrl: './user-shell.html',
	styleUrl: './user-shell.scss',
})
export class UserShell {
	private readonly snackBar = inject(MatSnackBar);
	private readonly router = inject(Router);
	protected readonly activeApp = inject(ActiveApp);
	protected readonly theme = inject(Theme);
	protected readonly auth = inject(Auth);
	protected readonly sections = USER_DRAWER;
	/** Pinned: the drawer sits beside the content. Unpinned: it overlays it and closes after navigating. */
	protected readonly pinned = signal(readPinned());
	protected readonly opened = signal(this.pinned());
	protected readonly waltzarState: WaltzarState = inject(WALTZAR_STATE);
	protected readonly availableAppInstances = toSignal(this.waltzarState.availableAppInstances$, {
		requireSync: true
	});
	protected readonly activeAppInstance = toSignal(this.waltzarState.activeAppInstance$);

	constructor() {
		this.theme.useArea('user');
	}

	togglePin(): void {
		const pinned = !this.pinned();
		this.pinned.set(pinned);
		// Pinning keeps the open drawer where it is; unpinning gets it out of the way.
		this.opened.set(pinned);
		writePinned(pinned);
	}

	/** Called after any navigation item is chosen: an overlay drawer gets out of the way. */
	onNavigate(): void {
		if (!this.pinned()) {
			this.opened.set(false);
		}
	}

	onSwitch(app: AppInstanceInformation): void {
		if (app.id === this.activeAppInstance()?.id) {
			return;
		}
		this.waltzarState.switchActiveAppInstance(app);
		// The new application's forms are the natural next thing to look at.
		this.router.navigateByUrl('/app/forms');
		// this.snackBar.open(`Switched to ${done.name}`, 'OK', { duration: 2500 });
	}

	onPlaceholder(item: DrawerItem): void {
		this.onNavigate();
		this.snackBar.open(`“${item.label}” is a sample menu item`, 'OK', {duration: 2500});
	}
}

function readPinned(): boolean {
	try {
		return localStorage?.getItem(PIN_STORAGE_KEY) !== 'false';
	} catch {
		return true;
	}
}

function writePinned(pinned: boolean): void {
	try {
		localStorage?.setItem(PIN_STORAGE_KEY, String(pinned));
	} catch {
		// A preference we cannot persist is not worth failing a click over.
	}
}
