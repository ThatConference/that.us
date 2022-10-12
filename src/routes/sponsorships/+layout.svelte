<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	const metaTags = ((title = 'THAT Conference Sponsorships') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Learn more about how you can help support THAT Conference.'
		}),
		openGraph: {
			type: 'website',
			url: `https://that.us/sponsorship/prospectus/`
		},
		noindex: true,
		nofollow: true
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />
<slot />
