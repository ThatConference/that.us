<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Layout from '../_components/_Layout.svelte';
	import Header from '../_components/_Header.svelte';

	const metaTags = ((title = 'Travel Information - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/support/travel`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header pretext="THAT Campsite">Travel and Lodging Information</Header>

	<div class="flex flex-col place-content-center gap-4 md:grid md:grid-cols-2">
		<div class="transform p-12 transition duration-500 ease-in-out hover:scale-105">
			<a href="/support/travel/wi/">
				<img src="/images/that-wi-logo.svg" />
			</a>
		</div>
		<div class="transform p-12 transition duration-500 ease-in-out hover:scale-105">
			<a href="/support/travel/tx/">
				<img src="/images/that-tx-logo.svg" />
			</a>
		</div>
	</div>
</Layout>
