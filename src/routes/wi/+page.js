import { redirect } from '@sveltejs/kit';
import { events } from '$utils/config.public';

export async function load() {
	throw redirect(302, `/events/${events.next.wi.slug}/`);
}
