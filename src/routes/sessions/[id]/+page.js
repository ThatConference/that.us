import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const { id } = params;

	throw redirect(301, `/activities/${id}`);
}
