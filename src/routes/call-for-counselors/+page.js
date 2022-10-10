import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(302, `/call-for-counselors/tx/2023`);
}
