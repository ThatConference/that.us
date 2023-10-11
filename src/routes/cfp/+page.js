import { redirect } from '@sveltejs/kit';
import { thatConferenceRedirect as tcr } from '$utils/config.public.js';

export async function load() {
	throw redirect(301, `${tcr.baseUrl}/cfp`);
}
