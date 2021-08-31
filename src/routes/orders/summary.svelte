<script>
	import { useMachine } from 'xstate-svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';

	import Layout from './_components/_Layout.svelte';
	import Steps from './_components/_Steps.svelte';
	import Cart from './_components/_Cart.svelte';

	import summaryMachine from './_machines/summary';
	import createStepsMachine from './_machines/steps';

	const metaTags = seoMetaTags({
		title: 'Order Summary - THAT',
		description: 'View the items in your cart.',
		openGraph: {
			type: 'website',
			url: `https://that.us/orders/summary`
		},
		noindex: true,
		nofollow: true
	});

	const { state } = useMachine(summaryMachine(createStepsMachine()), {
		devTools: debug.xstate
	});
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

{#if ['waiting', 'ready'].some($state.matches)}
	<Layout>
		<div class="lg:flex lg:justify-between">
			<div>
				<h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
					Order Summary
				</h2>

				<div class="mt-6">
					<Steps stateMachine={$state.context.stepsMachine} />
				</div>
			</div>
		</div>

		<div class="my-12 lg:flex lg:justify-between">
			<Cart />
		</div>
	</Layout>
{/if}
