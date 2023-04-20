import auth0 from '$utils/security/client';

export const trailingSlash = 'always';

export function GET({ request }) {
	const returnTo = request.url.searchParams?.get('returnTo') || '/';
	return auth0.handleLogin(request, { returnTo });
}
