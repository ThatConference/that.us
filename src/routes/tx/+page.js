import { redirect } from '@sveltejs/kit';
import { events } from '$utils/config.public';

export async function load() {
	throw redirect(301, `https://thatconference.com/${events.next.tx.slug}/`);
}
