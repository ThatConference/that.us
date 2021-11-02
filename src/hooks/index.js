import * as Sentry from '@sentry/node';
import { sequence } from '@sveltejs/kit/hooks';
import auth0 from '$utils/security';
import config, { logging } from '$utils/config';
import { QUERY_ME } from '$dataSources/api.that.tech/me';

let body = {
	query: `
	${QUERY_ME}
	`,
	variables: {}
};

Sentry.init({
	dsn: logging.dsn,
	release: config.version,
	debug: false,
	attachStacktrace: true
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

export async function getSession(request) {
	let { isAuthenticated, user, thatProfile, accessToken } = request.locals;

	if (isAuthenticated && accessToken) {
		const results = await fetch(config.api, {
			method: 'POST',
			headers: {
				credentials: 'include',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(body)
		}).then((r) => r.json());

		thatProfile = results.data.members?.me;
	}

	return { isAuthenticated, user, thatProfile, accessToken };
}

export async function handleError({ error, request }) {
	const thisError = error instanceof Error ? error : new Error(error);
	Sentry.captureException(new Error(thisError), { request });
}
