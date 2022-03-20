<script context="module">
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	export async function load({ params, fetch }) {
		const { event, date } = params;
		const eventSlug = `${event}/${date}`;

		const queryEvent = () => eventsApi(fetch).queryEventBySlug(eventSlug);

		return {
			props: {
				event: await queryEvent()
			}
		};
	}
</script>

<script>
	export let event;

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	import seoMetaTags from '$utils/seo/metaTags';
	import Layout from '$components/events/layouts/hybrid/Layout.svelte';
	import Seo from '$components/Seo.svelte';

	import Hero from '../../_components/tickets/_Hero.svelte';
	import Professional from '../../_components/tickets/_Professional.svelte';
	import Workshops from '../../_components/tickets/_Workshops.svelte';
	import Families from '../../_components/tickets/_Families.svelte';
	import Notices from '../../_components/Notices.svelte';

	const { send } = getContext('cart');

	const metaTags = ((title = 'THAT Conference tickets and discounts explained.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Ticket Breakdown',
			openGraph: {
				type: 'website',
				url: `https://that.us/events/${event.slug}/tickets`
			}
		})
	}))();

	function handleOnTicketPurchase(e) {
		const eventTicket = event.products
			.filter((p) => p.isEnabled)
			.find((p) => p.uiReference === e.ref);

		send('ADD_ITEM', {
			eventId: event.id,
			...eventTicket
		});

		goto('/orders/summary/');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout {event}>
	<section class="mt-40">
		<Hero {event} />
	</section>

	<section id="professionals">
		<Professional
			{event}
			on:purchase-hybrid-ticket={({ detail }) => handleOnTicketPurchase(detail)} />
		<Notices />
	</section>

	<section id="workshops">
		<Workshops {event} on:purchase-hybrid-ticket={({ detail }) => handleOnTicketPurchase(detail)} />
	</section>

	<section id="families">
		<Families {event} on:purchase-hybrid-ticket={({ detail }) => handleOnTicketPurchase(detail)} />
	</section>
</Layout>
