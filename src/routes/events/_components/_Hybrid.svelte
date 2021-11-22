<script>
	export let event;

	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { Highlight as HighlightLink } from '$elements/links';

	import Layout from '$elements/layouts/LandingLayout.svelte';
	import Nav from '$components/nav/interiorNav/Top.svelte';
	import UpNextEvent from '$components/activities/UpNextEvent.svelte';
	import CallForSpeakers from '$components/cta/_CallForSpeakers.svelte';

	import Speakers from './speakers/_Speakers.svelte';
	import What from './hybrid/_What.svelte';
	import Hero from './hybrid/_Hero.svelte';
	import Partners from './hybrid/_Partners.svelte';
	import FAQ from './hybrid/_FAQ.svelte';
	import CamperTickets from './hybrid/_CamperTickets.svelte';
	import Membership from './_MembershipCard.svelte';
	import Dates from '../_components/hybrid/dates.svelte';

	const { send } = getContext('cart');
	const { products } = event;

	function handleOnTicketPurchase(e) {
		const eventTicket = products.filter((p) => p.isEnabled).find((p) => p.uiReference === e.ref);

		send('ADD_ITEM', {
			eventId: event.id,
			...eventTicket
		});

		goto('/orders/summary/');
	}

	function handleOnPurchaseMembership(e) {
		const eventTicket = products
			.filter((f) => f.isEnabled)
			.find((e) => e.productType === 'MEMBERSHIP');

		send('ADD_ITEM', {
			eventId: event.id,
			...eventTicket,
			quantity: 1
		});

		goto('/orders/summary/');
	}
</script>

<Layout>
	<section in:fade slot="nav">
		<Nav />
	</section>

	<section in:fade>
		<Hero {event} />
	</section>

	<section in:fade={{ delay: 200 }}>
		<What {event} />
	</section>

	<section id="tickets">
		<CamperTickets
			{event}
			on:purchase-hybrid-ticket={({ detail }) => handleOnTicketPurchase(detail)}
		/>
	</section>

	<section>
		<Membership {event} on:purchase-membership={handleOnPurchaseMembership}>
			<div slot="header">
				<div class="relative flex flex-col items-center justify-center">
					<h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-thatBlue-800 ">
						Go beyond camp.
					</h2>

					<p class="text-center max-w-6xl mx-auto text-xl sm:mt-5 sm:text-2xl text-gray-500">
						We created THAT to fill a gap between the times when we cannot physically connect. We
						believe peer-to-peer learning is one of the most powerful ways we can help one another
						any day of the year.
					</p>

					<p class="text-center max-w-6xl mx-auto text-xl sm:mt-5 sm:text-2xl text-gray-500">
						Every month we host THAT Online aimed at bringing us all together to recenter and
						recharge.
					</p>
				</div>
			</div>
		</Membership>
	</section>

	<section id="upnext">
		{#if event.isCallForSpeakersOpen === true}
			<CallForSpeakers {event} />
		{:else}
			<Speakers {event} />
			<UpNextEvent {event}>
				<div slot="action">
					<HighlightLink href={`/activities/${event.slug}`}>View the entire schedule</HighlightLink>
				</div>
			</UpNextEvent>
		{/if}
	</section>

	<!--dates-->
	<section>
		<Dates milestones={event.milestones} />
	</section>

	<section id="sponsors">
		<Partners {event} />
	</section>

	<div class="bg-fixed thatBackground">
		<div class="h-96" />
	</div>

	<section id="faq">
		<FAQ />
	</section>
</Layout>

<style>
	.thatBackground {
		background-image: url(/images/memories/hallway-background.jpg);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
</style>
