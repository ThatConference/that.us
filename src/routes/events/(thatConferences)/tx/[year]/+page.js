import { redirect, error } from '@sveltejs/kit';
import { thatConferenceRedirect as tcr } from '$utils/config.public.js';

export function load({ params }) {
	const { year } = params;
	if (!Number.isInteger(Number.parseInt(year, 10))) {
		throw error(404, 'Event not found');
	}
	throw redirect(tcr.defaultStatus, `${tcr.baseUrl}/tx/${year}/`);
}
