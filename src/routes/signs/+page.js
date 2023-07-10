import lodash from 'lodash';
import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ fetch }) {
	const { getPresentEventPartners } = partnersApi(fetch);
	const { groupBy } = lodash;

	const partners = await getPresentEventPartners();
	const levels = groupBy(partners, 'level');

	return {
		levels
	};
}
