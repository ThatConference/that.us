<script>
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import { Waiting } from '$elements';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	import Layout from './_components/_Layout.svelte';
	import Hero from './_components/_Hero.svelte';
	import FAQ from './_components/_FAQ.svelte';

	const metaTags = ((title = 'Promotions - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Let us help.',
			openGraph: {
				type: 'website',
				url: `https://that.us/promo`
			}
		})
	}))();

	const eventId = $page.url.searchParams.get('eventId');
	const { send } = getContext('cart');

	let event;

	async function queryEvent() {
		event = await eventsApi().queryEventById(eventId);
		return event;
	}

	function handleOnTicketPurchase(e) {
		const eventTicket = event.products
			.filter((p) => p.isEnabled)
			.find((p) => p.uiReference === e.ref);

		send('ADD_ITEM', {
			eventId: event.id,
			...eventTicket
		});

		goto('/orders/summary');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<section slot="nav">
		<Nav />
	</section>

	{#await queryEvent()}
		<div class="flex flex-grow justify-center py-12">
			<Waiting />
		</div>
	{:then event}
		<section in:fade>
			<Hero {event} on:purchase-promo-ticket={({ detail }) => handleOnTicketPurchase(detail)} />
		</section>

		<section in:fade>
			<FAQ />
		</section>
	{/await}
</Layout>
