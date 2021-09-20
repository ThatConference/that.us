import auth0 from '$utils/security';

export function get(req) {
	console.log('in login');
	return auth0.handleLogin(req);
}
