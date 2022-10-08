import { redirect } from '@sveltejs/kit';

export async function load() {
	const eventId = 'w1ZQFzsSZzRuItVCNVmC';

	throw redirect(301, `/partners/leads/${eventId}`);
}
