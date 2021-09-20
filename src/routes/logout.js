import auth0 from '$utils/security';

export function get(req) {
	console.log('in logout');

	return auth0.handleLogout(req);
}
