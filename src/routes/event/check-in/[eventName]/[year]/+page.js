import lodash from 'lodash';
import checkinQueryApi from '$dataSources/api.that.tech/checkin/queries';

const { sortBy } = lodash;

export async function load({ params }) {
	const { eventName, year } = params;
	const eventSlug = `${eventName}/${year}`;

	const { queryEventRegistrations } = checkinQueryApi();

	const registrations = await queryEventRegistrations(eventSlug).then((r) =>
		sortBy(r, 'member.lastName')
	);

	return {
		registrations
	};
}
