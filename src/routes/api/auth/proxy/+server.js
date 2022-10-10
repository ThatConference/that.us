import auth0 from '$utils/security/server';
import { json, error } from '@sveltejs/kit';
import fetch from 'isomorphic-fetch';
import config from '$utils/config.public';

export async function POST({ request }) {
	const { accessToken } = await auth0.getAccessToken(request);
	const body = await request.json();

	if (!accessToken) {
		throw error(401, 'Unauthorized Access');
	}

	const results = await fetch(config.api.direct, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify(body)
	})
		.then((r) => r.json())
		.catch((err) => {
			console.error('PROXY POST ERROR', err);
			throw error(500, err);
		});

	return json(results);
}
