import auth0 from '$utils/security/client';

export function GET({ request }) {
	const returnTo = request.url.searchParams?.get('returnTo') || '/';
	return auth0.handleLogin(request, { returnTo });
}
