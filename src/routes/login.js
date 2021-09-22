import auth0 from '$utils/security';

export function get(svelteReq) {
	const returnTo = svelteReq.query.get('returnTo');
	return auth0.handleLogin(svelteReq, { returnTo });
}
