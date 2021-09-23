import wretch from 'wretch';
import auth0 from '$utils/security';
import * as Sentry from '@sentry/node';
import { logging } from '$utils/config';

import { QUERY_ME } from '$dataSources/api.that.tech/me';

Sentry.init({
	dsn: logging.dsn
});

const endpoint = `https://api.that.tech/graphql/`;

async function afterCallback(req, res, session, state) {
	let body = {
		query: `
		${QUERY_ME}
		`,
		variables: {}
	};

	const results = await wretch(endpoint)
		.auth(`Bearer ${session.accessToken}`)
		.post(body)
		.json()
		.catch((error) => {
			Sentry.captureException(error);
		});

	session.thatProfile = results.data.members?.me;

	return session;
}

export function get(req, res) {
	try {
		return auth0.handleCallback(req, { afterCallback });
	} catch (error) {
		Sentry.captureException(error, { req });
		res.status(error.status || 400).end(error.message);
	}
}
