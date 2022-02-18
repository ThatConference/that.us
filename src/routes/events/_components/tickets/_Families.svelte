<script>
	export let event;

	import { createEventDispatcher } from 'svelte';

	import TicketCard from '../_TicketCard.svelte';

	const dispatch = createEventDispatcher();
	const { products } = event;

	const geeklingTicket = products.find((p) => p.uiReference === 'GEEKLING');
	const campmateTicket = products.find((p) => p.uiReference === 'CAMPMATE');

	const familyTickets = [
		{
			...geeklingTicket,
			includes: [
				'Family Pre-Conference',
				'Family Sessions',
				'THAT Badge',
				'T-Shirt',
				'Waterpark Party Access',
				'Hog Roast',
				'Game Night'
			]
		},
		{
			...campmateTicket,
			includes: [
				'Family Pre-Conference',
				'Family Sessions',
				'THAT Badge',
				'T-Shirt',
				'Waterpark Party Access',
				'Hog Roast',
				'Game Night'
			]
		}
	];

	function handlePurchase(ref) {
		dispatch('purchase-hybrid-ticket', {
			eventId: event.id,
			ref
		});
	}
</script>

<div class="relative">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-3">
			<img
				class="col-start-2 object-center"
				src="/images/characters/what_to_expect_families_welcome.png"
				alt
			/>
		</div>
	</div>

	<div id="families">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="lg:pr-12">
				<h2 class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
					Families Welcome!
				</h2>

				<p class="prose-xl mt-12 text-gray-500">
					At our core, THAT Conference is about family, community and the next generation of
					technologists. We strive to provide opportunities for children to speak, learn and
					experience many areas of the STEM field while interacting with industry professionals. At
					THAT Conference, families are not only welcomed, but encouraged to join us for family
					sessions.
				</p>
			</div>
		</div>

		<div class="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
			<div class="relative">
				<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<!-- <div
            class="flex flex-col md:flex-row justify-center md:space-x-4 space-y-16 md:space-y-0"> -->
					<div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
						{#each familyTickets as ticket}
							<TicketCard
								ticketDetails={ticket}
								on:click={() => handlePurchase(ticket.uiReference)}
							/>
						{/each}
					</div>

					<div class="flex justify-center py-4 lg:justify-end">
						<p class="italic text-red-500">
							*** please note these tickets are only for in-person campers.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
