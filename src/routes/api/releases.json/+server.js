import { json } from '@sveltejs/kit';

export const trailingSlash = 'always';

export async function GET({ _query, _locals }) {
	return json({
		stuff: 'asdf'
	});
}
