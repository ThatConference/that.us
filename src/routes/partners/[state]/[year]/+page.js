import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const { state, year } = params;
	const eventSlug = `${state}/${year}`;

	throw redirect(302, `/events/${eventSlug}/sponsors`);
}
