// file needs to be +layout.server.js to ensure security fires in hooks.server.js handle
import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	const session = await locals.getSession();
	const returnTo = url.searchParams?.get('returnTo') ?? '/';

	if (!session) {
		redirect(303, `/login-redirect?returnTo=${returnTo}`);
	}
}
