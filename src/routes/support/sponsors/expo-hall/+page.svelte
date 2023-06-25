<script>
	import Layout from '../../_components/_Layout.svelte';
	import Header from '../../_components/_Header.svelte';
	import { Standard as StandardButton } from '$elements/buttons';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	let { claimCodes, events } = data;
	let claimCode = '';
	let isInvalidCode = false;
	const claimTicket = getContext('claimTicket');

	function handleClaimTicket() {
		isInvalidCode = false;
		if (!claimCode) return;
		const code = claimCodes.find((c) => c[claimCode]) || {};
		const event = events.find((e) => e.slug === code[claimCode]?.eventSlug);
		console.log('event', event);
		if (event) {
			const ticket = event.products.find((p) => p.uiReference === 'CLAIMABLE_TICKET');
			console.log('ticket', ticket);
			if (ticket) {
				// add ticket to basket
				const to = {
					eventId: event.id,
					eventDetails: event,
					productId: ticket.id
				};
				claimTicket.send('ADD_ITEM', to);
				goto('/orders/claim/');
			}
		} else {
			// invalid code
			isInvalidCode = true;
		}
	}
</script>

<Layout>
	<Header pretext="Sponsorship Support" center={true}>Expo Hall Only Ticket Claim</Header>
	<section>
		<div class="prose prose-lg mx-auto text-gray-500">
			<p>
				This is where you claim your Expo Hall ticket. Use the code you received in the box below
				and follow the instructions. If you need a code email us at <a
					href="mailto:partners@thatconference.com">partners@thatconference.com</a> or speak to anyone
				in a staff shirt onsite.
			</p>
			<p>
				<strong>What is an Expo Hall Only Ticket?</strong>: The Expo Hall Only ticket is for
				sponsor's booth workers to register for an event. The ticket provides access to the Expo
				Hall only, all 4 days at THAT Conference enabling the booth worker to receive a sponsor
				badge, and participate at your company's booth, game night, the waterpark party, open spaces
				and the closing ceremony.
			</p>
			<p>
				The ticket does not include any food, beverages or sessions during the 3-day main event or
				the 1-day workshops, your hotel room or hotel water park passes.
			</p>
		</div>
		<div>
			<div class="mt-12 flex justify-center space-x-6">
				<input
					maxlength="20"
					type="text"
					placeholder="enter claim code"
					bind:value={claimCode}
					class="rounded-md border-thatBlue-400 focus-within:bg-gray-100" />
				<StandardButton on:click={handleClaimTicket}>Claim Ticket</StandardButton>
			</div>
			<p hidden={!isInvalidCode} class=" text-center text-sm italic text-red-500 ">
				THAT code is invalid. Please contact THAT Crew.
			</p>
		</div>
	</section>
</Layout>
