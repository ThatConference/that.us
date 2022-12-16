import { redirect } from '@sveltejs/kit';

export async function load() {
	const eventId = 'THATConferenceTexas2023';

	throw redirect(301, `/partners/leads/${eventId}`);
}
