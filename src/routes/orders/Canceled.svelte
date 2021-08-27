<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Layout from './_components/_Layout.svelte';

	const metaTags = seoMetaTags({
		title: 'Payment Canceled - THAT',
		description: 'Your payment was cancelled.',
		openGraph: {
			type: 'website',
			url: `https://that.us/orders/cancelled`
		},
		noindex: true,
		nofollow: true
	});
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

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
				<aButton href="/orders/summary" text="Return to Cart" />
			</div>
		</div>
	</div>
</Layout>
