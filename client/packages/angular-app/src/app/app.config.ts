import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
	ApplicationConfig,
	inject,
	InjectionToken,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {MAT_ICON_DEFAULT_OPTIONS} from '@angular/material/icon';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {Auth} from './core/auth/auth';
import {AuthApi, HttpAuthApi} from './core/auth/auth-api';
import {authInterceptor} from './core/auth/auth.interceptor';
import {environment} from '../environments/environment';
import {WaltzarState} from '@waltzar/core';
import {WaltzarStateImplementation} from '@waltzar/core';


export const WALTZAR_STATE = new InjectionToken<WaltzarState>('WALTZAR_STATE');

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideHttpClient(withInterceptors([authInterceptor])),
		{provide: AuthApi, useClass: HttpAuthApi},
		// Restore an existing session before the first route guard runs.
		provideAppInitializer(() => inject(Auth).restore()),
		// Material Symbols carries the newer icon names used across both areas.
		{provide: MAT_ICON_DEFAULT_OPTIONS, useValue: {fontSet: 'material-symbols-outlined'}},
		provideRouter(
			routes,
			withComponentInputBinding(),
			withInMemoryScrolling({scrollPositionRestoration: 'top'}),
		),
		{
			provide: WALTZAR_STATE,
			useFactory: (auth: Auth) =>
				new WaltzarStateImplementation(environment, auth),
			deps: [Auth]
		}
	],
};
