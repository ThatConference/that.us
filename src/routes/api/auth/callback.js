import auth0 from '$utils/security';
import fetch from 'isomorphic-fetch';
import config from '$utils/config';

import { QUERY_ME } from '$dataSources/api.that.tech/me';

async function afterCallback(req, res, session, state) {
	let body = {
		query: `
		${QUERY_ME}
		`,
		variables: {}
	};

	try {
		const results = await fetch(config.api, {
			method: 'POST',
			headers: {
				credentials: 'include',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.accessToken}`
			},
			body: JSON.stringify(body)
		}).then((r) => r.json());

		session.thatProfile = results.data.members?.me;
		return session;
	} catch (error) {
		console.error('Fetch Call Error', error);
		return session;
	}
}

export function get(req) {
	return auth0.handleCallback(req, { afterCallback });
}
