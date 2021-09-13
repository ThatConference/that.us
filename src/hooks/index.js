import * as cookie from 'cookie';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');

	const isAuthenticated = cookies['auth0.is.authenticated']
		? cookies['auth0.is.authenticated']
		: false;
	request.locals.user = { isAuthenticated };

	return await resolve(request);
}

export function getSession({ locals }) {
	return {
		user: locals.user
	};
}
