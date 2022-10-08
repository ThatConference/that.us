import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ params }) {
	const { partner, job } = params;
	const { queryPartnerJobListing } = partnerQueryApi();

	return {
		job,
		partner: await queryPartnerJobListing(partner, job)
	};
}
