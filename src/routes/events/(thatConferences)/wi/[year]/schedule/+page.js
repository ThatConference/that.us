import { redirect, error } from '@sveltejs/kit';
import { thatConferenceRedirect as tcr } from '$utils/config.public.js';
// import sessionsApi from '$dataSources/api.that.tech/sessions';

export async function load({ params }) {
	const { year } = params;
	if (!Number.isInteger(Number.parseInt(year, 10))) {
		throw error(404, 'Event not found');
	}
	throw redirect(tcr.defaultStatus, `${tcr.baseUrl}/wi/${year}/schedule/`);

	// const { querySessionsBySlug } = sessionsApi();

	// let filterForFamily = url.searchParams.get('family') === 'true';

	// let { event } = await parent();
	// const sessions = await querySessionsBySlug({ slug: event.slug, pageSize: 250 });

	// return {
	// 	sessions,
	// 	filterForFamily
	// };
}
