import auth0 from '$utils/security';

export function get(req) {
	return auth0.handleProfile(req);
}
