import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { eventSlug } = await parent();

	throw redirect(302, `/partners/${eventSlug}`);
}
