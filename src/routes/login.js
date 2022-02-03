import auth0 from '$utils/security';

export function get(requestEvent) {
	const returnTo = requestEvent.url.searchParams?.get('returnTo') || '/';
	return auth0.handleLogin(requestEvent, { returnTo });
}
