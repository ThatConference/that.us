import fetch from 'isomorphic-fetch';
import config from '$utils/config';

export async function POST(requestEvent) {
	const { locals, request } = requestEvent;
	const body = await request.json();

	if (!locals.isAuthenticated) {
		return {
			status: 401
		};
	}

	const results = await fetch(config.api.direct, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.auth0Session.accessToken}`
		},
		body: JSON.stringify(body)
	})
		.then((r) => r.json())
		.catch((error) => {
			console.error('PROXY POST ERROR', error);
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
