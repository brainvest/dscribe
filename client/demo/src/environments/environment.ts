export const environment = {
	production: false,
	apiServerRoot: '/',
	clientRoot: '/',
	auth: {
		authority: 'https://my.enjoyn.ai/auth/',
		client_id: 'invoice',
		redirect_uri: 'http://localhost:4200/auth-callback',
		post_logout_redirect_uri: 'http://localhost:4200/',
		silent_redirect_uri: 'http://localhost:4200/oidc-silent-refresh/index.html'
	}
};
