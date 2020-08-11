export const environment = {
	production: false,
	apiServerRoot: '/',
	clientRoot: '/',
	auth: {
		authority: 'https://my.enjoyn.ai/auth/realms/enjoyn/',
		client_id: 'enjoyn',
		redirect_uri: 'http://localhost:4200/auth-callback',
		post_logout_redirect_uri: 'http://localhost:4200/',
		silent_redirect_uri: 'http://localhost:4200/oidc-silent-refresh/index.html'
	}
};

// export const environment = {
// 	production: false,
// 	apiServerRoot:  '/',
//     clientRoot: '/admin/',
// 	auth: {
// 		authority: 'https://keycloak.skillstreets.com/auth/realms/skillstreets/',
// 		redirect_uri: 'http://localhost:4200/auth-callback',
// 		post_logout_redirect_uri: 'http://localhost:4200/',
// 		silent_redirect_uri: 'http://localhost:4200/oidc-silent-refresh/index.html',
// 		client_id: 'dataadmin'
// 	},
// };
