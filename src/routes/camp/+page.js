import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(302, `/events/wi/2023/schedule/`);
}
