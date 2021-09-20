// import * as Sentry from '@sentry/browser';
import { sequence } from '@sveltejs/kit/hooks';
import auth0 from '$utils/security';

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

export async function user({ request, resolve }) {
	const auth0Session = auth0.getSession(request);
	request.locals.auth0Session = auth0Session;
	request.locals.isAuthenticated = !!auth0Session?.user;
	request.locals.user = auth0Session?.user || {};

	// console.log('in user hook', request.locals);
	// console.log('auth0Session in hooks', auth0Session);

	const response = await resolve(request);
	// You could modify the response here, e.g. by adding custom headers
	// return response;

	return {
		...response,
		headers: {
			// authorization: `Bearer ${auth0Session?.accessToken}`,
			...response.headers
		}
	};
}

export const handle = sequence(customHeaders, user);

export function getSession(request) {
	const { isAuthenticated, user } = request.locals;
	return { isAuthenticated, user };
}

// export async function handleError({ error, request }) {
// 	console.log('in handle error in hooks');
// 	Sentry.captureException(error, { request });
// }
