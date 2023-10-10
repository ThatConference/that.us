import { redirect } from '@sveltejs/kit';
import { thatConferenceRedirect as tcr } from '$utils/config.public.js';

export function load() {
	throw redirect(tcr.defaultStatus, `${tcr.baseUrl}/tx`);
}
