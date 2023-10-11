// import lodash from 'lodash';
// import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';
import { redirect, error } from '@sveltejs/kit';
import { thatConferenceRedirect as tcr } from '$utils/config.public.js';

export async function load({ params }) {
	const { year } = params;
	if (!Number.isInteger(Number.parseInt(year, 10))) {
		throw error(404, 'Event not found');
	}
	throw redirect(tcr.defaultStatus, `${tcr.baseUrl}/wi/${year}/sponsors/`);

	// const { groupBy } = lodash;
	// const { year } = params;
	// const { getEventPartners } = partnerQueryApi(fetch);

	// const eventSlug = `wi/${year}`;

	// const event = await getEventPartners(eventSlug);
	// const levels = groupBy(event.partners, 'level');

	// return {
	// 	event,
	// 	levels
	// };
}
