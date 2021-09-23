import fetch from 'isomorphic-fetch';

const endpoint = `https://api.that.tech/graphql/`;

export async function post({ body, locals }) {
	if (!locals.isAuthenticated) {
		return {
			status: 401
		};
	}

	const results = await fetch(endpoint, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.auth0Session.accessToken}`
		},
		body: JSON.stringify(body)
	}).then((r) => r.json());

	return {
		status: 200,
		body: results
	};
}
