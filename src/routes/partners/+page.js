import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load() {
	const { getUpcomingPartners } = partnersApi();

	return {
		partners: await getUpcomingPartners()
	};
}
