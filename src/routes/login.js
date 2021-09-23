import auth0 from '$utils/security';

export function get(svelteReq) {
	const returnTo = svelteReq.query.get('returnTo');
	console.log('return to', returnTo);
	return auth0.handleLogin(svelteReq, { returnTo });
}
