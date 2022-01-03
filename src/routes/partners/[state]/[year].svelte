<script>
	import { page } from '$app/stores';
	import lodash from 'lodash';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

	import PartnerLevel from '../_components/_EventPartnerLevel.svelte';
	import Hero from '../_components/_EventHero.svelte';

	const { groupBy } = lodash;
	const { state, year } = $page.params;
	const eventSlug = `${state}/${year}`;

	const metaTags = ((title = 'THAT Conference sponsors and partners.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Thank you to those who support our great community every day.',
			openGraph: {
				type: 'website',
				url: `https://that.us/partners/${eventSlug}`
			}
		})
	}))();

	const { getEventPartners } = partnerQueryApi();

	async function queryEventPartners(slug) {
		const data = await getEventPartners(slug);
		const levels = groupBy(data.partners, 'level');

		return { data, levels };
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<main>
		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			{#await queryEventPartners(eventSlug) then event}
				<div class="py-16 bg-opactity-75 bg-gradient-to-t from-gray-200">
					<Hero event={event.data} />
				</div>

				<div class="mx-auto max-w-screen-xl px-4 sm:px-6">
					{#if event.levels['PIONEER']}
						<PartnerLevel header="Pioneer Sponsors" partners={event.levels['PIONEER']} />
					{/if}

					{#if event.levels['EXPLORER']}
						<PartnerLevel header="Explorer Sponsors" partners={event.levels['EXPLORER']} />
					{/if}

					{#if event.levels['SCOUT']}
						<PartnerLevel header="Scout Sponsors" partners={event.levels['SCOUT']} />
					{/if}

					{#if event.levels['MEDIA']}
						<PartnerLevel header="Media Sponsors" partners={event.levels['MEDIA']} />
					{/if}
				</div>
			{/await}
		</div>
	</main>
</Layout>
