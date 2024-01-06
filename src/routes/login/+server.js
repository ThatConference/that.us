import { redirect, error } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

export async function GET({ fetch, locals, url }) {
	const { searchParams } = url;

	let returnTo = url.searchParams?.get('returnTo') || '/';

	if (searchParams.size > 1) {
		if (returnTo.length > 1) {
			searchParams.delete('returnTo');
			returnTo = `${returnTo}?${searchParams.toString()}`;
		}
	}

	let _url = '/';
	try {
		const session = await locals.getSession();
		if (!session?.user) {
			const tokenCall = await fetch('/auth/csrf');
			const csrfTokenResponse = await new Response(tokenCall.body).json();
			const csrfToken = csrfTokenResponse.csrfToken;

			const formData = new URLSearchParams();
			formData.append('redirect', 'false');
			formData.append('csrfToken', csrfToken);
			formData.append('callbackUrl', returnTo);

			const signInRequest = await fetch('/auth/signin/auth0', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Auth-Return-Redirect': '1'
				},
				body: formData.toString()
			});

			const signInResponse = await new Response(signInRequest.body).json();
			if (signInResponse?.url) {
				_url = signInResponse.url;
			}
		}
	} catch (err) {
		Sentry.setContext('error', { err });
		throw error(500, 'Authentication Login Error');
	}

	if (_url) {
		throw redirect(302, _url);
	}
}
