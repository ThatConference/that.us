import lodash from 'lodash';
import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ params, fetch }) {
	const { groupBy } = lodash;
	const { year } = params;
	const { getEventPartners } = partnerQueryApi(fetch);

	const eventSlug = `tx/${year}`;

	const event = await getEventPartners(eventSlug);
	const levels = groupBy(event.partners, 'level');

	return {
		event,
		levels
	};
}
