import lodash from 'lodash';
import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ params }) {
	const { groupBy } = lodash;
	const { state, year } = params;
	const { getEventPartners } = partnerQueryApi();

	const eventSlug = `${state}/${year}`;

	const event = await getEventPartners(eventSlug);
	const levels = groupBy(event.partners, 'level');

	return {
		event,
		levels
	};
}
