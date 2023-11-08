<script>
	export let data;

	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import Layout from '$elements/layouts/LandingLayout.svelte';
	import { Highlight as HighlightLink } from '$elements/links';

	import Seo from '$components/Seo.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import UpNextEvent from '$components/activities/UpNextEvent.svelte';

	import seoMetaTags from '$utils/seo/metaTags';

	// shared event components
	import Speakers from '../../../_components/speakers/Speakers.svelte';
	import Membership from '../../../_components/MembershipCard.svelte';
	import FAQ from '../../../_components/FAQ.svelte';

	// online components
	import CTA from '../../_components/EventCTA.svelte';
	import OnlineHero from '../../_components/OnlineHero.svelte';
	import EventFollowers from '../../_components/EventFollowers.svelte';
	import EventTicket from '../../_components/EventTicket.svelte';

	const cart = getContext('cart');
	const claimTicket = getContext('claimTicket');

	let { event, eventSlug } = data;

	const metaTags = ((title = `${event.name} - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${event.description} at THAT`,
			openGraph: {
				type: 'website',
				url: `https://that.us/events/${eventSlug}`
			}
		})
	}))();

	async function handleClaimTicket(event, { product }) {
		const ticket = {
			eventId: event.id,
			eventDetails: event,
			productId: product.id,
			productDetails: product
		};

		claimTicket.send('ADD_ITEM', ticket);
		goto('/orders/claim/');
	}

	function handleAddEventTicketClick(eventId, eventProducts, quantity = 1) {
		const eventTicket = eventProducts
			.filter((f) => f.isEnabled)
			.find((e) => e.productType === 'TICKET');
		const isBulkPurchase = quantity > 1 ? true : false;

		cart.send('ADD_ITEM', {
			eventId,
			eventDetails: event,
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

		cart.send('ADD_ITEM', {
			eventId,
			eventDetails: event,
			...eventTicket,
			isBulkPurchase,
			quantity
		});
		goto('/orders/summary/');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />
<Layout>
	<section in:fade slot="nav">
		<Nav />
	</section>

	<section in:fade slot="header">
		<OnlineHero
			{event}
			on:claim-ticket={({ detail }) => handleClaimTicket(event, detail)}
			on:purchase-event-ticket={() => handleAddEventTicketClick(event.id, event.products)} />
	</section>

	<section in:fade={{ delay: 200 }}>
		<EventTicket
			{event}
			on:claim-ticket={({ detail }) => handleClaimTicket(event, detail)}
			on:purchase-event-ticket={() => handleAddEventTicketClick(event.id, event.products)} />
	</section>

	<section in:fade={{ delay: 250 }}>
		<Membership {event}>
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
			on:purchase-event-ticket={() => handleAddEventTicketClick(event.id, event.products)} />
	</section>

	<section>
		<FAQ />
	</section>
</Layout>
