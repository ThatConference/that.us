import lodash from 'lodash';
import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ fetch }) {
	const { getUpcomingPartners } = partnersApi(fetch);
	const { groupBy } = lodash;

	const partners = await getUpcomingPartners();

	const levels = groupBy(partners, 'level');

	return {
		partners,
		levels
	};
}
