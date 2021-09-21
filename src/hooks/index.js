// import * as Sentry from '@sentry/browser';
import { sequence } from '@sveltejs/kit/hooks';
import auth0 from '$utils/security';
import { QUERY_ME } from '$dataSources/api.that.tech/me';
import wretch from 'wretch';

export async function customHeaders({ request, resolve }) {
	const response = await resolve(request);

	return {
		...response,
		headers: {
			...response.headers,
			'that-site': 'that.us'
		}
	};
}

export async function thatProfile({ request, resolve }) {
	if (request.locals.isAuthenticated) {
		const endpoint = `https://api.that.tech/graphql/`;

		let body = {
			query: `
					${QUERY_ME}
					`,
			variables: {}
		};

		const results = await wretch(endpoint)
			.auth(`Bearer ${request.locals.auth0Session.accessToken}`)
			.post(body)
			.json();

		request.locals.thatProfile = results.data.members?.me;
	}

	const response = await resolve(request);
	return response;
}

export async function user({ request, resolve }) {
	const auth0Session = auth0.getSession(request);
	request.locals.auth0Session = auth0Session;

	request.locals.isAuthenticated = !!auth0Session?.user;
	request.locals.user = auth0Session?.user || {};

	const response = await resolve(request);
	return response;
}

export const handle = sequence(customHeaders, user, thatProfile);

export function getSession(request) {
	const { isAuthenticated, user, thatProfile } = request.locals;
	return { isAuthenticated, user, thatProfile };
}

// export async function handleError({ error, request }) {
// 	console.log('in handle error in hooks');
// 	Sentry.captureException(error, { request });
// }
