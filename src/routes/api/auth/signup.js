import auth0 from '$utils/security';

export function get(req, res) {
	return auth0
		.handleLogin(req, res, {
			authorizationParams: {
				prompt: 'login',
				screen_hint: 'signup'
			}
		})
		.catch((error) => {
			res.status(error.status || 400).end(error.message);
		});
}
