import auth0 from '$utils/security';

export function get(svelteReq) {
	console.log('login api was called');
	const returnTo = svelteReq.query.get('returnTo');
	return auth0.handleLogin(svelteReq, { returnTo });
}
