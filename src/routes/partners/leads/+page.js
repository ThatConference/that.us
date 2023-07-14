import { redirect } from '@sveltejs/kit';

export async function load() {
	const eventId = 'THATConferenceWisconsin2023';

	throw redirect(301, `/partners/leads/${eventId}`);
}
