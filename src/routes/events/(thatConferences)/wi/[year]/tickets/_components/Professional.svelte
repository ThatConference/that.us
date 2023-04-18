<script>
	export let event;

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import lodash from 'lodash';

	import { Standard as StandardButton, HighlightShell } from '$elements/buttons';

	import RowDetails from './TBL-Row.svelte';
	import pricingBreakdown, { ticketBreakdown } from './data/pricing';

	const { keyBy } = lodash;
	const { products } = event;
	const { send } = getContext('cart');

	const eventTickets = keyBy(
		products.filter((t) => t.uiReference),
		(i) => i.uiReference
	);

	function handleAddToCart(uiReference) {
		const eventTicket = event.products
			.filter((p) => p.isEnabled)
			.find((p) => p.uiReference === uiReference);

		send('ADD_ITEM', {
			eventId: event.id,
			eventDetails: event,
			...eventTicket
		});

		goto('/orders/summary/');
	}
</script>

<div class="relative">
	<div class="mx-auto max-w-2xl lg:max-w-7xl">
		<div class="px-6 py-24">
			<h2
				class="pb-6 text-4xl font-extrabold leading-8 tracking-tight text-thatBlue-800 sm:text-5xl lg:pb-24">
				Professional Campers
			</h2>

			<div class="flex items-center">
				<div class="hidden w-1/4 justify-center lg:flex">
					<img class="h-full w-full" src="/images/characters/sassy_with_badge.svg" alt />
				</div>

				<div class="lg:w-3/4 lg:pl-12">
					<p class="prose-xl mt-12 text-gray-500">
						As a Camper, you receive up to 4 days of 200 professional sessions across various
						technologies, platforms, and disciplines of all levels. You can also access over 10,000
						sq. ft. of open spaces to participate in more intimate discussions across all topics you
						and your fellow attendees generated. All sessions, including open spaces, are designed
						to build your road to level up your skills, career and take charge of
						<span class="font-bold">you</span>.
					</p>

					<p class="prose-xl mt-12 text-gray-500">
						Each day starts with an inspiring keynote, breakfast, and beverages. Then you’re off on
						your camping adventure to join in the many professional sessions, share your ideas and
						experiences in a welcoming open space, and/or learn how to solder in our Maker space.
						Lunch is served midday and a special social event wraps up each afternoon to encourage
						networking and continued learning.
					</p>
				</div>
			</div>
		</div>

		<!-- sm -> lg -->
		<div class="space-y-24 px-6 lg:hidden">
			<div>put a quick jump list here...</div>

			{#each ticketBreakdown as ticket}
				<section class="rounded-lg bg-white px-4 py-6 shadow-lg">
					<div class="mb-8 w-full px-4">
						<div class="flex items-center">
							<div class="w-3/4">
								<h2 class="text-3xl font-bold leading-6 text-gray-900">
									{eventTickets[ticket.uiReference].name}
								</h2>
								<p class="prose-md mt-4 text-gray-500">
									{eventTickets[ticket.uiReference].shortDescription}
								</p>
							</div>

							<div class="flex w-1/3 justify-center">
								<div class="mt-4 flex items-center">
									<span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
										<span class="mr-2 mt-2 text-4xl font-medium">$</span>
										<span class="font-extrabold">
											{eventTickets[ticket.uiReference].price}
										</span>
									</span>
								</div>
							</div>
						</div>

						<div class="mt-6">
							<HighlightShell>
								<button
									on:click={() => handleAddToCart(ticket.uiReference)}
									class="w-full px-8 py-2 md:px-10">Purchase</button>
							</HighlightShell>
						</div>
					</div>

					{#each ticket.includes as item}
						<div class="flex flex-col">
							<h2
								class="border-t border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-900">
								{item.title}
							</h2>
							{#each item.includes as i}
								<div class="divide-y divide-gray-200">
									<div class="border-t border-gray-200">
										<p class="px-4 py-5 text-left text-sm font-normal text-gray-500">
											{i.title}
										</p>
									</div>
								</div>
							{/each}
						</div>
					{/each}

					<div class="mt-6">
						<div class="border-t border-gray-200 px-4 pt-5">
							<HighlightShell>
								<button
									type="button"
									on:click={() => handleAddToCart(ticket.uiReference)}
									class="w-full px-8 py-2 md:px-10">Purchase</button>
							</HighlightShell>
						</div>
					</div>
				</section>
			{/each}
		</div>

		<!-- lg+ -->
		<div class="hidden rounded-lg bg-white py-16 shadow-lg sm:px-6 sm:py-20 lg:block lg:px-8 ">
			<table class="h-px w-full table-fixed">
				<caption class="sr-only">Pricing plan comparison</caption>

				<thead>
					<tr>
						<th class="pb-4 pl-6 pr-6 text-left text-sm font-medium text-gray-900" scope="col">
							<span>Professional Tickets</span>
						</th>

						{#each ticketBreakdown as ticket}
							<th
								class="w-1/6 px-6 pb-4 text-center align-top text-lg font-medium leading-6 text-gray-900"
								scope="col">{eventTickets[ticket.uiReference].name}</th>
						{/each}
					</tr>
				</thead>

				<tbody class="divide-y divide-gray-200 border-t border-gray-200">
					<tr>
						<th
							class="py-8 pl-6 pr-6 text-left align-top text-sm font-medium text-gray-900"
							scope="row">Pricing</th>

						{#each ticketBreakdown as ticket}
							<td class="h-full px-6 py-8 align-top">
								<div class="flex h-full flex-col ">
									<div class="mt-4 flex items-center">
										<span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
											<span class="mr-2 mt-2 text-4xl font-medium">$</span>
											<span class="font-extrabold">
												{eventTickets[ticket.uiReference].price}
											</span>
										</span>
									</div>

									<p class="mt-4 flex-grow text-sm text-gray-500">
										{eventTickets[ticket.uiReference].shortDescription}
									</p>

									<div class="mt-6">
										<StandardButton on:click={() => handleAddToCart(ticket.uiReference)}>
											Purchase
										</StandardButton>
									</div>
								</div>
							</td>
						{/each}
					</tr>

					<!-- section start -->
					{#each pricingBreakdown as breakdown}
						<tr>
							<th
								class="bg-gray-50 py-3 pl-6 text-left text-sm font-medium text-gray-900"
								colspan="6"
								scope="colgroup">{breakdown.title}</th>
						</tr>

						{#each breakdown.includes as item}
							<RowDetails title={item.title} included={item.isIncluded} />
						{/each}
					{/each}
				</tbody>

				<tfoot>
					<tr class="border-t border-gray-200">
						<th class="sr-only" scope="row">Choose your plan</th>

						<td class="px-6 pt-12">
							<StandardButton on:click={() => handleAddToCart('WORKSHOPS')}
								>Purchase</StandardButton>
						</td>

						<td class="px-6 pt-12">
							<StandardButton on:click={() => handleAddToCart('CAMPER_NO_FOOD')}
								>Purchase</StandardButton>
						</td>
						<td class="px-6 pt-12">
							<StandardButton on:click={() => handleAddToCart('CAMPER')}>Purchase</StandardButton>
						</td>
						<td class="px-6 pt-12">
							<StandardButton on:click={() => handleAddToCart('EVERYTHING_CAMPER')}>
								Purchase
							</StandardButton>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</div>
