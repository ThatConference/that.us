<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/nativation';
	import { page } from '$app/stores';
	import { getClient } from '@urql/svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import Layout from '$elements/layouts/LandingLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';

	import Hero from './_components/tickets/_Hero.svelte';
	import Professional from './_components/tickets/_Professional.svelte';
	import Workshops from './_components/tickets/_Workshops.svelte';
	import Families from './_components/tickets/_Families.svelte';
	import Notices from './_components/_Notices.svelte';

	import metaTagsStore from '$stores/metaTags';
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	const { send } = getContext('cart');
	const { id, name } = $page.params;
	const eventSlug = `${id}/${name}`;

	const metaTags = seoMetaTags({
		title: 'Tickets - THAT',
		description: 'Ticket Breakdown',
		openGraph: {
			type: 'website',
			url: `https://that.us/events/${eventSlug}/tickets`
		}
	});

	let event; //used later in the handler

	async function queryEvent() {
		event = await eventsApi(getClient()).queryEventBySlug(eventSlug);
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

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<Layout>
	<section in:fade slot="nav">
		<Nav />
	</section>
	{#await queryEvent() then event}
		<section>
			<Hero {event} />
		</section>

		<section id="professionals">
			<Professional
				{event}
				on:purchase-hybrid-ticket={({ detail }) => handleOnTicketPurchase(detail)}
			/>
			<Notices />
		</section>

		<section id="workshops">
			<Workshops
				{event}
				on:purchase-hybrid-ticket={({ detail }) => handleOnTicketPurchase(detail)}
			/>
		</section>

		<section id="families">
			<Families
				{event}
				on:purchase-hybrid-ticket={({ detail }) => handleOnTicketPurchase(detail)}
			/>
		</section>
	{/await}
</Layout>
