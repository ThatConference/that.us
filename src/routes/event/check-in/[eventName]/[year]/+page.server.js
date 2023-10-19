// file needs to be page.server.js to ensure security fires in hooks.server.js handle
import { error } from '@sveltejs/kit';
import lodash from 'lodash';
import checkinQueryApi from '$dataSources/api.that.tech/checkin/queries';

const { sortBy } = lodash;

export async function load({ params, fetch, locals }) {
	const session = await locals.getSession();
	const permissions = session?.user?.permissions ?? [];
	if (!permissions.includes('volunteer')) {
		throw error(401, 'Unauthorized');
	}
	const { eventName, year } = params;
	const eventSlug = `${eventName}/${year}`;

	const { queryEventRegistrations } = checkinQueryApi(fetch);

	const registrations = await queryEventRegistrations(eventSlug).then((r) =>
		sortBy(r, 'member.lastName')
	);

	return {
		registrations
	};
}
