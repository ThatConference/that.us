import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ fetch }) {
	const { getUpcomingPartners } = partnersApi(fetch);

	const partners = await getUpcomingPartners();

	return {
		partners
	};
}
