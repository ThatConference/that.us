import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load() {
	const { getPastPartners } = partnersApi();

	return {
		partners: await getPastPartners()
	};
}
