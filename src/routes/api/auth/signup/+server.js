import auth0 from '$utils/security/server';

export function GET({ request }) {
	return auth0.handleLogin(request, {
		authorizationParams: {
			screen_hint: 'signup',
			prompt: 'login'
		}
	});
}
