<script>
	export let event;

	import { createEventDispatcher } from 'svelte';
	import lodash from 'lodash';

	import { Check, Ban } from '$elements/svgs';
	import { Highlight as HighlightLink } from '$elements/links';
	import { Standard as StandardButton, Highlight as HighlightButton } from '$elements/buttons';

	import Notices from '../_Notices.svelte';

	const { keyBy } = lodash;
	const dispatch = createEventDispatcher();

	const { products } = event;
	const eventTickets = keyBy(
		products.filter((t) => t.uiReference),
		(i) => i.uiReference
	);

	// todo.. get memberships type

	function handleTicketPurchase(ref) {
		dispatch('purchase-hybrid-ticket', {
			eventId: event.id,
			ref
		});
	}

	function handleMembershipPurchase(ref) {
		dispatch('purchase-membership-ticket', {
			eventId: event.id,
			ref
		});
	}
</script>

<div>
	<div class="bg-thatBlue-800 pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
		<div class="relative flex flex-col items-center justify-center space-y-12">
			<p class="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Camper Tickets</p>

			<p class="text-center max-w-6xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
				As a Camper, you receive up to 4 days of 200 professional sessions across various
				technologies, platforms, and disciplines of all levels. You can also access over 10,000 sq.
				ft. of open spaces to participate in more intimate discussions across all topics you and
				your fellow attendees generated. All sessions, including open spaces, are designed to build
				your road to level up your skills, career and take charge of
				<span class="font-bold">you</span>.
			</p>

			<div class="mt-8">
				<div class="flex flex-col">
					<div class="animate-pulse">
						<HighlightLink href={`/events/${event.slug}/tickets`}>
							<span class="text-xl uppercase font-bold tracking-wider">
								View all ticket options
							</span>
						</HighlightLink>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="pb-6 lg:pb-10 bg-thatBlue-100 bg-opacity-25">
		<div class="bg-gradient-to-b from-thatBlue-800">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="pt-20 relative lg:grid lg:grid-cols-7">
					<div
						class="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3"
					>
						<div
							class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg"
						>
							<div class="flex-1 flex flex-col">
								<div class="bg-white px-6 py-10">
									<div>
										<h3 class="text-center text-2xl font-bold uppercase text-gray-500">
											{eventTickets['WORKSHOPS'].name}
										</h3>
										<div class="mt-4 flex items-center justify-center">
											<span class="px-3 flex items-start text-6xl tracking-tight text-gray-900">
												<span class="mt-2 mr-2 text-4xl font-medium">$</span>
												<span class="font-extrabold">{eventTickets['WORKSHOPS'].price}</span>
												<span class="mt-2 ml-2 text-xl font-medium tracking-wide text-gray-400">
													USD
												</span>
											</span>
										</div>
									</div>
								</div>
								<div
									class="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10"
								>
									<ul class="space-y-4">
										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Check />
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">
												Access to the Pre-Conference
											</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Check />
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">
												Lunch and all day beverage
											</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Check />
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Welcome Reception</p>
										</li>
									</ul>
									<div class="mt-8">
										<div class="flex flex-col">
											<StandardButton on:click={() => handleTicketPurchase('WORKSHOPS')}>
												Purchase
											</StandardButton>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4"
					>
						<div class="relative rounded-lg shadow-xl">
							<div
								class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatOrange-400"
								aria-hidden="true"
							/>
							<div class="absolute inset-x-0 top-0 transform translate-y-px">
								<div class="flex justify-center transform -translate-y-1/2">
									<span
										class="inline-flex rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-bold tracking-wider uppercase text-white"
									>
										Best Value
									</span>
								</div>
							</div>
							<div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
								<div>
									<h3 class="text-center text-2xl font-bold uppercase text-gray-500">
										{eventTickets['EVERYTHING_CAMPER'].name}
									</h3>
									<div class="mt-4 flex items-center justify-center">
										<span class="px-3 flex items-start text-6xl tracking-tight text-gray-900">
											<span class="mt-2 mr-2 text-4xl font-medium"> $ </span>
											<span class="font-extrabold">
												{eventTickets['EVERYTHING_CAMPER'].price}
											</span>
											<span class="mt-2 ml-2 text-xl font-medium tracking-wide text-gray-400">
												USD
											</span>
										</span>
									</div>
								</div>
							</div>
							<div
								class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10"
							>
								<ul class="space-y-4">
									<li class="flex items-start">
										<div class="flex-shrink-0">
											<Check />
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											Full access to all 4 days
										</p>
									</li>

									<li class="flex items-start">
										<div class="flex-shrink-0">
											<Check />
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											Daily Breakfast, Lunch and Beverages
										</p>
									</li>

									<li class="flex items-start">
										<div class="flex-shrink-0">
											<Check />
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											THAT t-shirt, badge, and swag
										</p>
									</li>
									<li class="flex items-start">
										<div class="flex-shrink-0">
											<Check />
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											Welcome Reception, Happy Hours, Pig Roast
										</p>
									</li>
									<li class="flex items-start">
										<div class="flex-shrink-0">
											<Check />
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">Waterpark Party</p>
									</li>
								</ul>
								<div class="mt-10">
									<div class="flex flex-col">
										<HighlightButton on:click={() => handleTicketPurchase('EVERYTHING_CAMPER')}>
											Purchase
										</HighlightButton>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3"
					>
						<div
							class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg"
						>
							<div class="flex-1 flex flex-col">
								<div class="bg-white px-6 py-10">
									<div>
										<h3 class="text-center text-2xl font-bold uppercase text-gray-500">
											{eventTickets['VIRTUAL_CAMPER'].name}
										</h3>
										<div class="mt-4 flex items-center justify-center">
											<span class="px-3 flex items-start text-6xl tracking-tight text-gray-900">
												<span class="mt-2 mr-2 text-4xl font-medium">$</span>
												<span class="font-extrabold">
													{eventTickets['VIRTUAL_CAMPER'].price}
												</span>
												<span class="mt-2 ml-2 text-xl font-medium tracking-wide text-gray-400">
													USD
												</span>
											</span>
										</div>
									</div>
								</div>
								<div
									class="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10"
								>
									<ul class="space-y-4">
										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Check />
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Keynotes</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Check />
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">
												Join and create virtual sessions
											</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Check />
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">THAT t-shirt (US Only)</p>
										</li>
									</ul>
									<div class="mt-8">
										<div class="flex flex-col">
											<StandardButton on:click={() => handleTicketPurchase('VIRTUAL_CAMPER')}>
												Purchase
											</StandardButton>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Notices />
	</div>
</div>
