import auth0 from '$utils/security';
import fetch from 'isomorphic-fetch';

import { QUERY_ME } from '$dataSources/api.that.tech/me';

const endpoint = `https://api.that.tech/graphql/`;

async function afterCallback(req, res, session, state) {
	let body = {
		query: `
		${QUERY_ME}
		`,
		variables: {}
	};

	try {
		const results = await fetch(endpoint, {
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

export function get(req, res) {
	try {
		return auth0.handleCallback(req, { afterCallback });
	} catch (error) {
		console.error('error in handle callback', error);
		res.status(error.status || 400).end(error.message);
	}
}
