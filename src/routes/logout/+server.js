import auth0 from '$utils/security/client';

export function GET({ request }) {
	return auth0.handleLogout(request);
}
