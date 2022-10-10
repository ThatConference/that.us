import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ fetch }) {
	const { getPastPartners } = partnersApi(fetch);

	return {
		partners: await getPastPartners()
	};
}
