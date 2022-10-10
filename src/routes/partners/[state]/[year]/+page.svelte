<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$components/events/layouts/hybrid/Layout.svelte';

	import PartnerLevel from '../../_components/_EventPartnerLevel.svelte';
	import Hero from '../../_components/_EventHero.svelte';

	let { event, levels } = data;
	const metaTags = ((title = 'THAT Conference sponsors and partners.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Thank you to those who support our great community every day.',
			openGraph: {
				type: 'website',
				url: `https://that.us/partners/${event.slug}`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout {event}>
	<main class="mt-40">
		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			<Hero {event} />

			<div class="mx-auto max-w-screen-xl px-4 sm:px-6">
				{#if levels['PIONEER']}
					<PartnerLevel header="Pioneer Sponsors" partners={levels['PIONEER']} />
				{/if}

				{#if levels['EXPLORER']}
					<PartnerLevel header="Explorer Sponsors" partners={levels['EXPLORER']} />
				{/if}

				{#if levels['SCOUT']}
					<PartnerLevel header="Scout Sponsors" partners={levels['SCOUT']} />
				{/if}

				{#if levels['CUB']}
					<PartnerLevel header="Family Sponsors" partners={levels['CUB']} />
				{/if}

				{#if levels['MEDIA']}
					<PartnerLevel header="Media Sponsors" partners={levels['MEDIA']} />
				{/if}
			</div>
		</div>
	</main>
</Layout>
