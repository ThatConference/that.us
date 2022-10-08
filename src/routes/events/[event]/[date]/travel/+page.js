import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const { event } = params;

	throw redirect(302, `/support/travel/${event}/`);
}
