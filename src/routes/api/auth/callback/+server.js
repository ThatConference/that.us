import auth0 from '$utils/security';
import fetch from 'isomorphic-fetch';
import config from '$utils/config';

import { QUERY_ME } from '$dataSources/api.that.tech/me';

async function afterCallback(_req, _res, session, _state) {
	let body = {
		query: `
		${QUERY_ME}
		`,
		variables: {}
	};

	try {
		const results = await fetch(config.api.direct, {
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
		console.error('Callback Fetch Error', error);
		return session;
	}
}

export function GET(requestEvent) {
	return auth0.handleCallback(requestEvent, { afterCallback });
}
