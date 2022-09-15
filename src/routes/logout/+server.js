import auth0 from '$utils/security';

export function GET(requestEvent) {
	return auth0.handleLogout(requestEvent);
}
