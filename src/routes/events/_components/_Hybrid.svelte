<script>
	export let event;

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	import { Highlight as HighlightLink } from '$elements/links';

	import Layout from '$components/events/layouts/hybrid/Layout.svelte';
	import UpNextEvent from '$components/activities/UpNextEvent.svelte';
	import CallForSpeakers from '$components/cta/_CallForSpeakers.svelte';

	import Speakers from './speakers/_Speakers.svelte';
	import Membership from './_MembershipCard.svelte';

	import CamperTickets from './hybrid/CamperTickets.svelte';
	import Hero from './hybrid/Hero.svelte';
	import WhatIs from './hybrid/WhatIs.svelte';
	import What from './hybrid/What.svelte';
	import Gallery from './hybrid/Gallery.svelte';
	import Partners from './hybrid/Partners.svelte';
	import FAQ from './hybrid/FAQ.svelte';
	import Dates from './hybrid/dates.svelte';

	const { send } = getContext('cart');

	const { products } = event;
	const [venue] = event.venues;
	const everythingCamperTicket = products.find((x) => x.uiReference === 'EVERYTHING_CAMPER');

	function handleOnTicketPurchase(e) {
		const eventTicket = products.filter((p) => p.isEnabled).find((p) => p.uiReference === e.ref);

		send('ADD_ITEM', {
			eventId: event.id,
			...eventTicket
		});

		goto('/orders/summary/');
	}

	function handleOnPurchaseMembership() {
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

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: event.name,
		startDate: event.startDate,
		endDate: event.endDate,
		eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		location: [
			{
				'@type': 'VirtualLocation',
				url: `https://that.us/events/${event.slug}`
			},
			{
				'@type': 'Place',
				name: venue.name,
				address: {
					'@type': 'PostalAddress',
					streetAddress: venue.address,
					addressLocality: event.city,
					postalCode: venue.zip,
					addressRegion: venue.state,
					addressCountry: 'US'
				}
			}
		],
		image: [event.logo],
		description: event.description,
		offers: {
			'@type': 'Offer',
			name: everythingCamperTicket.name,
			description: everythingCamperTicket.description,
			url: `https://that.us/events/${event.slug}/tickets/`,
			price: everythingCamperTicket.price,
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

<div class="bg-thatBlue-100 bg-opacity-25">
	<Layout {event}>
		<section class="mt-24">
			<Hero {event} />
		</section>

		<section>
			<WhatIs />
		</section>

		<section>
			<What {event} />
		</section>

		<section>
			<Gallery />
		</section>

		<section id="tickets">
			<CamperTickets
				{event}
				on:purchase-hybrid-ticket={({ detail }) => handleOnTicketPurchase(detail)} />
		</section>

		{#if event.isCallForSpeakersOpen === true}
			<section id="upnext">
				<CallForSpeakers {event} />
			</section>
		{:else}
			<section>
				<Speakers title="Featured Speakers" showAllSpeakers speakers={event.featuredSpeakers} />
			</section>
			<section id="upnext">
				<UpNextEvent {event}>
					<div slot="action">
						<HighlightLink href={`/activities/${event.slug}`}
							>View the entire schedule</HighlightLink>
					</div>
				</UpNextEvent>
			</section>
		{/if}

		<!--dates-->
		<section>
			<Dates milestones={event.milestones} />
		</section>

		<section id="sponsors">
			<Partners {event} />
		</section>

		<section>
			<Membership {event} on:purchase-membership={handleOnPurchaseMembership}>
				<div slot="header">
					<div class="relative flex flex-col items-center justify-center">
						<h2
							class="text-2xl font-extrabold uppercase text-thatBlue-700 antialiased sm:text-3xl lg:text-4xl xl:text-5xl">
							Become a Member
						</h2>

						<p class="mx-auto max-w-6xl text-center text-xl text-gray-500 sm:mt-5 sm:text-2xl">
							We created THAT.us to fill a gap between the times when we cannot physically connect.
							We believe peer-to-peer learning is one of the most powerful ways we can help one
							another any day of the year.
						</p>

						<p class="mx-auto max-w-6xl text-center text-xl text-gray-500 sm:mt-5 sm:text-2xl">
							Every month we host THAT Online aimed at bringing us all together to recenter and
							recharge.
						</p>
					</div>
				</div>
			</Membership>
		</section>

		<div class="thatBackground bg-fixed">
			<div class="h-96" />
		</div>

		<section id="faq" />
		<FAQ />
	</Layout>
</div>

{@html `<script type="application/ld+json">${JSON.stringify(schema) + '<'}/script>`}

<style>
	.thatBackground {
		background-image: url(/images/memories/hallway-background.jpg);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
</style>
