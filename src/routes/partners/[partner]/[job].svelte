<script>
	import { page } from '$app/stores';
	import { getClient } from '@urql/svelte';

	import ProfileLayout from '$elements/layouts/Profile.svelte';
	import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

	import JobHero from '../_components/_JobHero.svelte';
	import JobDetails from '../_components/_JobDetails.svelte';

	const { partner, job } = $page.params;
	const { queryPartnerJobListing } = partnerQueryApi(getClient());
</script>

<ProfileLayout>
	{#await queryPartnerJobListing(partner, job) then partner}
		<section>
			<JobHero {partner} />
		</section>

		<section>
			<JobDetails jobListing={partner.jobListing} />
		</section>
	{/await}
</ProfileLayout>
