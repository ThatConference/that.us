import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	let { member } = params;

	throw redirect(302, `/members/${member}/`);
}
