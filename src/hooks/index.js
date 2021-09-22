// import * as Sentry from '@sentry/browser';
import { sequence } from '@sveltejs/kit/hooks';
import auth0 from '$utils/security';

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

export async function verifyAccount({ request, resolve }) {
	if (request.path !== '/verify-account/') {
		if (request.locals.user) {
			const [provider] = request.locals.user?.sub.split('|');
			if (provider !== 'twitter') {
				if (request.locals.user.email_verified) {
					//redirect
					// goto('/verify-account');
					// return resolve({
					// 	status: 301,
					// 	redirect: `/verify-account/`
					// });
				}
			}
		}
	}
	const response = await resolve(request);
	return response;
}

export const handle = sequence(user, customHeaders);

export async function user({ request, resolve }) {
	const auth0Session = auth0.getSession(request);
	request.locals.auth0Session = auth0Session;

	request.locals.isAuthenticated = !!auth0Session?.user;
	request.locals.user = auth0Session?.user || {};
	request.locals.thatProfile = auth0Session?.thatProfile || {};

	const response = await resolve(request);
	return response;
}

export function getSession(request) {
	const { isAuthenticated, user, thatProfile } = request.locals;
	return { isAuthenticated, user, thatProfile };
}

// export async function handleError({ error, request }) {
// 	console.log('in handle error in hooks');
// 	Sentry.captureException(error, { request });
// }
