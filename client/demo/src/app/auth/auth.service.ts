/************************************************
 *  Based on https://www.scottbrady91.com/Angular/SPA-Authentiction-using-OpenID-Connect-Angular-CLI-and-oidc-client
 */

import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { environment } from '../../environments/environment';
import { of, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user: User = null;
	private manager = new UserManager(getClientSettings());
	
	getAuthorizationHeaderValue = () => {
		return this.user && `${this.user.token_type} ${this.user.id_token}`;
	};

	get username() {
		return this.user && this.user.profile.email;
	}

	logout() {
		this.manager.signoutRedirect();
	}

	constructor() {
		this.manager.events.addUserLoaded(user => {
			this.user = user;
		});
		this.manager.events.addSilentRenewError(console.error);
	}

	isLoggedIn(): Observable<boolean> {
		if (this.user) {
			return of(this.user && !this.user.expired);
		}
		return from(this.manager.getUser()).pipe(
			map(user => {
				this.user = user;
				return this.user && !this.user.expired;
			})
		);
	}

	getClaims(): any {
		return this.user && this.user.profile;
	}

	startAuthentication(): Promise<void> {
		return this.manager.signinRedirect();
	}

	completeAuthentication(): Promise<void> {
		return this.manager.signinRedirectCallback().then(user => {
			this.user = user;
		});
	}
}

export function getClientSettings(): UserManagerSettings {
	return {
		authority: environment.auth.authority,
		client_id: environment.auth.client_id,
		redirect_uri: environment.auth.redirect_uri,
		post_logout_redirect_uri: environment.auth.post_logout_redirect_uri,
		response_type: 'id_token token',
		scope: 'openid profile roles',
		filterProtocolClaims: true,
		loadUserInfo: true,
		automaticSilentRenew: true,
		silent_redirect_uri: environment.auth.silent_redirect_uri
	};
}
