export const environment = {
	production: true,
	apiServerRoot: 'http://localhost:5000/',
	auth: {
		authority: 'http://localhost:5001/',
		client_id: 'dscribe',
		redirect_uri: 'http://localhost:4200/auth-callback',
		post_logout_redirect_uri: 'http://localhost:4200/',
		silent_redirect_uri: 'http://localhost:4200/oidc-silent-refresh/index.html'
	}
};
