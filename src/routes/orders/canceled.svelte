<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Highlight as HighlightLink } from '$elements/links';

	import Layout from './_components/_Layout.svelte';

	const metaTags = ((title = 'Payment Canceled - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your payment was cancelled.',
			openGraph: {
				type: 'website',
				url: `https://that.us/orders/cancelled`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="space-y-12">
		<div class="text-base max-w-prose mx-auto lg:max-w-none">
			<h2 class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase">
				Payment Canceled
			</h2>
			<p
				class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900"
			>
				Oh No!
			</p>
		</div>

		<div class="relative">
			<div class="prose text-lg text-gray-500 mx-auto lg:max-w-none">
				<p>
					Your payment has been canceled. We've left the items in your cart in case this was in
					error.
				</p>

				<p>
					If you have any questions or need some help please just contact us in the chat window on
					the bottom right of your window.
				</p>
			</div>
			<div class="mt-12 flex justify-end space-x-5">
				<HighlightLink href="/orders/summary/">Return to Cart</HighlightLink>
			</div>
		</div>
	</div>
</Layout>
