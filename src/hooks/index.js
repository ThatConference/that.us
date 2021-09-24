import * as Sentry from '@sentry/node';
import { sequence } from '@sveltejs/kit/hooks';
import auth0 from '$utils/security';
import { logging } from '$utils/config';

Sentry.init({
	dsn: logging.dsn
});

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

export const handle = sequence(user, customHeaders);

export async function user({ request, resolve }) {
	const auth0Session = auth0.getSession(request);
	request.locals.auth0Session = auth0Session;

	request.locals.isAuthenticated = !!auth0Session?.user;
	request.locals.user = auth0Session?.user || {};
	request.locals.thatProfile = auth0Session?.thatProfile || {};
	request.locals.accessToken = auth0Session?.accessToken || {};

	const response = await resolve(request);
	return response;
}

export function getSession(request) {
	const { isAuthenticated, user, thatProfile, accessToken } = request.locals;
	return { isAuthenticated, user, thatProfile, accessToken };
}

export async function handleError({ error, request }) {
	Sentry.captureException(error, { request });
}
