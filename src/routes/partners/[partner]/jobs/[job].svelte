<script context="module">
	import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

	export async function load({ page }) {
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

	const metaTags = ((title = `${partner.jobListing.title} at ${partner.companyName}.`) => ({
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

	const schema = {
		'@context': 'https://schema.org/',
		'@type': 'JobPosting',
		title: partner.jobListing.title,
		description: partner.jobListing.description,
		directApply:
			partner.jobListing.applyNowLink ||
			`https://that.us/partners/${partner.companyName.toLowerCase()}/${job}`,

		identifier: {
			'@type': 'PropertyValue',
			name: partner.companyName,
			value: `${partner.jobListing.title} on THAT`
		},

		hiringOrganization: {
			'@type': 'Organization',
			name: partner.companyName,
			sameAs: partner.website,
			logo: partner.companyLogo
		}
	};
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

{@html `<script type="application/ld+json">${JSON.stringify(schema) + '<'}/script>`}
