<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Cart from './_components/_Cart.svelte';

	const metaTags = ((title = 'Order Summary - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'View the items in your cart.',
			openGraph: {
				type: 'website',
				url: `https://that.us/orders/summary`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="my-12 lg:flex lg:justify-between">
	<Cart />
</div>
