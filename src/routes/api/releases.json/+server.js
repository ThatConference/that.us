import { json } from '@sveltejs/kit';

export async function GET({ _query, _locals }) {
	return json({
		stuff: 'asdf'
	});
}
