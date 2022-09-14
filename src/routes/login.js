import auth0 from '$utils/security';

export function GET(requestEvent) {
	const returnTo = requestEvent.url.searchParams?.get('returnTo') || '/';
	return auth0.handleLogin(requestEvent, { returnTo });
}
