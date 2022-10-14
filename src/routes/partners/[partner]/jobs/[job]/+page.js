import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ params, fetch }) {
	const { partner, job } = params;
	const { queryPartnerJobListing } = partnerQueryApi(fetch);

	return {
		job,
		partner: await queryPartnerJobListing(partner, job)
	};
}
