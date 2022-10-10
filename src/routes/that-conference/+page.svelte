<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import { Hero, ThatActiveEvents } from '../_root/components';

	let { thatActiveEvents } = data;
	const metaTags = ((title = 'THAT Conference Texas and Wisconsin') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Join us at THAT Conference Wisconsin or THAT Conference Texas. You choose.',
			openGraph: {
				type: 'website',
				url: `https://that.us/that-conference/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Hero />
	<ThatActiveEvents events={thatActiveEvents} />
</Layout>
