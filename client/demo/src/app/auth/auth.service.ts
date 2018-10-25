/************************************************
 *  Based on https://www.scottbrady91.com/Angular/SPA-Authentiction-using-OpenID-Connect-Angular-CLI-and-oidc-client
 */


import {Injectable} from '@angular/core';
import {User, UserManager, UserManagerSettings} from 'oidc-client';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user: User = null;
	private manager = new UserManager(getClientSettings());
	getAuthorizationHeaderValue = () => {
		return this.user && `${this.user.token_type} ${this.user.id_token}`;
	};

	constructor() {
		this.manager.getUser().then(user => this.user = user);
		this.manager.events.addSilentRenewError(console.error);
	}

	isLoggedIn(): boolean {
		return this.user && !this.user.expired;
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
		authority: 'http://localhost:5001/',
		client_id: 'dscribe',
		redirect_uri: 'http://localhost:4200/auth-callback',
		post_logout_redirect_uri: 'http://localhost:4200/',
		response_type: 'id_token token',
		scope: 'openid profile roles',
		filterProtocolClaims: true,
		loadUserInfo: true,
		automaticSilentRenew: true,
		silent_redirect_uri: 'http://localhost:4200/oidc-silent-refresh/index.html'
	};
}
