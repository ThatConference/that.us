import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ fetch }) {
	const { getPastPartners } = partnersApi(fetch);

	const partners = await getPastPartners();
	partners.sort((a, b) => {
		if (a.companyName.toLowerCase() > b.companyName.toLowerCase()) return 1;
		if (a.companyName.toLowerCase() < b.companyName.toLowerCase()) return -1;
		return 0;
	});

	return {
		partners
	};
}
