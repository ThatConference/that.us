import auth0 from '$utils/security/server';

export function GET({ request }) {
	return auth0.handleCallback(request);
}
