import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { eventName } = await parent();

	throw redirect(302, `/support/travel/${eventName}/`);
}
