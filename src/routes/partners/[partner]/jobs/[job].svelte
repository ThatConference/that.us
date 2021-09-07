<script context="module">
	import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

	export async function load({ page, fetch, session, context }) {
		const { partner, job } = page.params;
		const { queryPartnerJobListing } = partnerQueryApi();

		return {
			props: {
				job,
				partner: await queryPartnerJobListing(partner, job)
			}
		};
	}
</script>

<script>
	export let partner;
	export let job;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import ProfileLayout from '$elements/layouts/Profile.svelte';

	import JobHero from '../../_components/_JobHero.svelte';
	import JobDetails from '../../_components/_JobDetails.svelte';

	const metaTags = ((title = `${partner.jobListing.title} at ${partner.companyName} - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${partner.jobListing.description}`,
			openGraph: {
				type: 'website',
				url: `https://that.us/partners/${partner.companyName.toLowerCase()}/${job}`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ProfileLayout>
	<section>
		<JobHero {partner} />
	</section>

	<section>
		<JobDetails jobListing={partner.jobListing} />
	</section>
</ProfileLayout>
