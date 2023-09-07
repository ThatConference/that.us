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
		if (event) {
			const ticket = event.products.find((p) => p.uiReference === 'CLAIMABLE_TICKET');
			if (ticket) {
				// add ticket to basket
				const to = {
					eventId: event.id,
					eventDetails: event,
					productId: ticket.id
				};
				claimTicket.send('ADD_ITEM', to);
				goto('/orders/claim/');
			} else {
				isInvalidCode = true;
			}
		} else {
			// invalid code
			isInvalidCode = true;
		}
	}
</script>

<Layout>
	<Header pretext="Sponsorship Support" center={true}>Expo Hall Only ticket</Header>
	<section>
		<div class="prose prose-lg mx-auto text-gray-500">
			<p>
				The Expo Hall Only Ticket is a free ticket for a sponsor booth worker to participate at
				their sponsor booth during the conference. The ticket enables an individual to attend their
				company’s booth and receive a sponsor badge. The ticket includes access to Game Night, Open
				Spaces and the Closing Ceremony. It does not include any food, beverages, sessions, keynotes
				or workshops during the entirety of the conference. Hotel rooms and waterpark passes are
				also excluded.
			</p>
			<p>One ticket is required for each individual participating at their sponsor booth.</p>
			<p>
				To claim a ticket, email <a href="mailto:partners@thatconference.com"
					>partners@thatconference.com</a> to receive a code or speak to anyone in a staff shirt onsite.
				If you have already received a code, simply enter it below:
			</p>
		</div>
		<div>
			<div class="mt-12 flex justify-center space-x-6">
				<input
					maxlength="20"
					type="text"
					placeholder="Enter claim code here"
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
