import auth0 from '$utils/security/server';
import { json, error } from '@sveltejs/kit';
import fetch from 'isomorphic-fetch';
import config from '$utils/config.public';
import * as Sentry from '@sentry/svelte';

export const trailingSlash = 'always';

export async function POST({ request }) {
	const body = await request.json();

	try {
		const { accessToken } = await auth0.getAccessToken(request);

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
			.then(async (r) => {
				if (!r.ok) {
					console.error('🧨 proxy request non 200 result', r.status, r.statusText);
					Sentry.setContext('proxy status', { status: r.status, statusText: r.statusText });
				}
				return r.json();
			})
			.catch((err) => {
				console.error('PROXY POST ERROR', err);

				Sentry.setContext('query', body);
				Sentry.captureException(new Error(err));

				throw error(500, err);
			});

		return json(results);
	} catch ({ message }) {
		console.error('AUTH0 EXCEPTION', message);

		Sentry.setContext('AUTH0 GetAccessToken body', { body });
		Sentry.captureMessage(message);

		return json({});
	}
}
