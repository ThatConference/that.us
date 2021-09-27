import fetch from 'isomorphic-fetch';
import config from '$utils/config';

export async function post({ body, locals }) {
	if (!locals.isAuthenticated) {
		return {
			status: 401
		};
	}

	const results = await fetch(config.api, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.auth0Session.accessToken}`
		},
		body: JSON.stringify(body)
	})
		.then((r) => r.json())
		.catch((error) => {
			console.log('PROXY POST ERROR', error);
			return {
				status: 500,
				body: error.message
			};
		});

	return {
		status: 200,
		body: results
	};
}
