import * as Sentry from '@sentry/browser';
import wretch from 'wretch';

const endpoint = `https://api.that.tech/graphql/`;

export async function post({ body, locals }) {
	if (!locals.isAuthenticated) {
		return {
			status: 401
		};
	}

	const results = await wretch(endpoint)
		.auth(`Bearer ${locals.auth0Session.accessToken}`)
		.post(body)
		.json();

	return {
		status: 200,
		body: results
	};
}
