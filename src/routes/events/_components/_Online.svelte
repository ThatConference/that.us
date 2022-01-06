<script>
	export let event;

	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	import Layout from '$elements/layouts/LandingLayout.svelte';
	import { Highlight as HighlightLink } from '$elements/links';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import SponsorSimple from '$components/SponsorSimple.svelte';
	import UpNextEvent from '$components/activities/UpNextEvent.svelte';

	import Speakers from './speakers/_Speakers.svelte';
	import Membership from './_MembershipCard.svelte';
	import FAQ from './_FAQ.svelte';

	import CTA from './online/_EventCTA.svelte';
	import OnlineHero from './online/_OnlineHero.svelte';
	import EventFollowers from './online/_EventFollowers.svelte';
	import EventTicket from './online/_EventTicket.svelte';

	const { send } = getContext('cart');
	const { products } = event;
	const virtualTicket = products.find((x) => x.productType === 'TICKET');

	function handleAddEventTicketClick(eventId, eventProducts, quantity = 1) {
		const eventTicket = eventProducts
			.filter((f) => f.isEnabled)
			.find((e) => e.productType === 'TICKET');
		const isBulkPurchase = quantity > 1 ? true : false;

		send('ADD_ITEM', {
			eventId,
			...eventTicket,
			isBulkPurchase,
			quantity
		});
		goto('/orders/summary/');
	}

	function handleAddMembershipClick(eventId, eventProducts, quantity = 1) {
		const eventTicket = eventProducts
			.filter((f) => f.isEnabled)
			.find((e) => e.productType === 'MEMBERSHIP');
		const isBulkPurchase = quantity > 1 ? true : false;

		send('ADD_ITEM', {
			eventId,
			...eventTicket,
			isBulkPurchase,
			quantity
		});
		goto('/orders/summary/');
	}

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: event.name,
		startDate: event.startDate,
		endDate: event.endDate,
		eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		location: [
			{
				'@type': 'VirtualLocation',
				url: `https://that.us/events/${event.slug}`
			}
		],
		image: [event.logo],
		description: event.description,
		offers: {
			'@type': 'Offer',
			name: virtualTicket.name,
			description: virtualTicket.description,
			url: `https://that.us/events/${event.slug}/tickets/`,
			price: virtualTicket.price,
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock',
			validFrom: event.ticketsOnSaleFrom || event.startDate
		},
		organizer: {
			'@type': 'Organization',
			name: 'THAT Conference',
			url: 'https://that.us'
		}
	};
</script>

<Layout>
	<section in:fade slot="nav">
		<Nav />
	</section>

	<section in:fade slot="header">
		<OnlineHero
			{event}
			on:purchase-event-ticket={() => handleAddEventTicketClick(event.id, event.products)}
		/>
	</section>

	<section in:fade={{ delay: 200 }}>
		<EventTicket
			{event}
			on:purchase-event-ticket={() => handleAddEventTicketClick(event.id, event.products)}
		/>
	</section>

	<section in:fade={{ delay: 250 }}>
		<Membership
			{event}
			on:purchase-membership={() => handleAddMembershipClick(event.id, event.products)}
		>
			<div slot="header">
				<div class="text-center">
					<h2 class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
						Support Us, Supporting You.
					</h2>
					<p class="mt-4 text-xl text-gray-600">
						We could create a free platform, but then you become the product. To that we say no
						thank you, we're the product. We're taking the approach of creating a monetization
						strategy of help us, help you.
					</p>
				</div>
			</div>
		</Membership>
	</section>

	<section>
		<Speakers {event} />
		<UpNextEvent {event}>
			<div slot="action">
				<HighlightLink href={`/activities/${event.slug}`}>View the entire schedule</HighlightLink>
			</div>
		</UpNextEvent>
	</section>

	{#if event.followers.members.length > 0}
		<section class="pb-12">
			<EventFollowers followers={event.followers.members} />
		</section>
	{/if}

	<section>
		<CTA
			on:purchase-membership={() => handleAddMembershipClick(event.id, event.products)}
			on:purchase-event-ticket={() => handleAddEventTicketClick(event.id, event.products)}
		/>
	</section>

	<section class="mx-auto max-w-7xl pb-12">
		<SponsorSimple eventId={event.eventId} />
	</section>

	<section>
		<FAQ />
	</section>
</Layout>

{@html `<script type="application/ld+json">${JSON.stringify(schema) + '<'}/script>`}
