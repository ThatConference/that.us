import { redirect, error } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';
import { securityConfig } from '$utils/config.public';

const config = securityConfig();

export async function GET({ fetch, locals, url }) {
	let idToken = '';

	try {
		const session = await locals.getSession();
		idToken = session?.idToken;

		if (session && !!session.accessToken) {
			// logout from app
			const tokenCall = await fetch('/auth/csrf');
			const csrfTokenResponse = await new Response(tokenCall.body).json();
			const csrfToken = csrfTokenResponse.csrfToken;

			const formData = new URLSearchParams();
			formData.append('redirect', 'false');
			formData.append('callbackUrl', `${url.origin}`);
			formData.append('csrfToken', csrfToken);

			const signOutRequest = await fetch('/auth/signout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Auth-Return-Redirect': '1'
				},
				body: formData.toString()
			});
			await new Response(signOutRequest.body).json();
		}
	} catch (err) {
		Sentry.setContext('error', { err });
		throw error(500, 'Authentication Logout Error');
	}
	// logout from oAuth layer
	let oidcLogout = '/';
	if (idToken) {
		oidcLogout = `${config.issuerBaseURL}oidc/logout?post_logout_redirect_uri=${encodeURIComponent(
			url.origin
		)}&id_token_hint=${idToken}`;
	}
	throw redirect(302, oidcLogout);
}
