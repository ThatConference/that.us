import auth0 from '$utils/security';

export function get(requestEvent) {
	return auth0.handleProfile(requestEvent, { refetch: true });
}
