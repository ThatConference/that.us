import wretch from 'wretch';
import auth0 from '$utils/security';

import { QUERY_ME } from '$dataSources/api.that.tech/me';

const endpoint = `https://api.that.tech/graphql/`;

async function afterCallback(req, res, session, state) {
	let body = {
		query: `
		${QUERY_ME}
		`,
		variables: {}
	};

	const results = await wretch(endpoint).auth(`Bearer ${session.accessToken}`).post(body).json();
	session.thatProfile = results.data.members?.me;

	return session;
}

export function get(req) {
	return auth0.handleCallback(req, { afterCallback });
}
