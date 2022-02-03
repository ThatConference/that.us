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

function user({ event, resolve }) {
	const auth0Session = auth0.getSession(event);
	event.locals.auth0Session = auth0Session;

	event.locals.isAuthenticated = !!auth0Session?.user;
	event.locals.user = auth0Session?.user || {};
	event.locals.thatProfile = auth0Session?.thatProfile || {};
	event.locals.accessToken = auth0Session?.accessToken || {};

	return resolve(event);
}

export const handle = sequence(user);

export async function getSession(event) {
	// todo - might be better to set the default to null or undefined.
	let { isAuthenticated, user, thatProfile, accessToken } = event.locals;

	if (isAuthenticated && accessToken) {
		const results = await fetch(config.api.direct, {
			method: 'POST',
			headers: {
				credentials: 'include',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				'that-site': 'that.us'
			},
			body: JSON.stringify(body)
		}).then((r) => r.json());

		thatProfile = results.data.members?.me;
	}

	return { isAuthenticated, user, thatProfile, accessToken };
}

export async function handleError({ error, event }) {
	const thisError = error instanceof Error ? error : new Error(error);
	Sentry.captureException(new Error(thisError), { event });
}
