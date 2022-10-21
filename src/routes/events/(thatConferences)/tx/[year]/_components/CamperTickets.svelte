<script>
	export let event;

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import lodash from 'lodash';

	import { Check, Ban } from '$elements/svgs';
	import { Highlight as HighlightLink } from '$elements/links';
	import { Standard as StandardButton, Highlight as HighlightButton } from '$elements/buttons';
	import { Shell as ShellButton } from '$elements/buttons';

	const { send } = getContext('cart');
	const { keyBy } = lodash;

	const { products } = event;
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

<div id="tickets">
	<div class="bg-thatBlue-800 px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
		<div class="relative flex flex-col items-center justify-center space-y-12">
			<p
				class=" text-2xl font-extrabold uppercase text-white antialiased sm:text-3xl lg:text-4xl xl:text-5xl">
				Camper Tickets
			</p>

			<p class="mx-auto max-w-6xl text-center text-xl text-gray-300 sm:mt-5 sm:text-2xl">
				As a Camper, you receive up to 4 days of 200 professional sessions across various
				technologies, platforms, and disciplines of all levels. You can also access over 10,000 sq.
				ft. of open spaces to participate in more intimate discussions across all topics you and
				your fellow attendees generated. All sessions, including open spaces, are designed to build
				your road to level up your skills, career and take charge of
				<span class="font-bold">you</span>.
			</p>
		</div>
	</div>

	<div class="bg-thatBlue-100 bg-opacity-25 pb-6 lg:pb-10">
		<div class="bg-gradient-to-b from-thatBlue-800">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="relative pt-20 lg:grid lg:grid-cols-7">
					<div
						class="mx-auto max-w-md lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:mx-0 lg:max-w-none">
						<div
							class="flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-l-lg">
							<div class="flex flex-1 flex-col">
								<div class="bg-white px-6 py-10">
									<div>
										<h3 class="text-center text-2xl font-bold uppercase text-gray-500">
											{eventTickets['CAMPER_NO_FOOD'].name}
										</h3>
										<div class="mt-4 flex items-center justify-center">
											<span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
												<span class="mt-2 mr-2 text-4xl font-medium">$</span>
												<span class="font-extrabold">{eventTickets['CAMPER_NO_FOOD'].price}</span>
												<span class="mt-2 ml-2 text-xl font-medium tracking-wide text-gray-400">
													USD
												</span>
											</span>
										</div>
									</div>
								</div>
								<div
									class="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
									<ul class="space-y-4">
										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">
												Full Access to All Sessions
											</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Waterpark Party</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">
												THAT t-shirt, badge, and swag
											</p>
										</li>
										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-red-500"><Ban /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Meals and Food Items</p>
										</li>
									</ul>
									<div class="mt-8">
										<div class="flex flex-col">
											<StandardButton on:click={() => handleAddToCart('CAMPER_NO_FOOD')}>
												Purchase
											</StandardButton>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="mx-auto mt-10 max-w-lg lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4 lg:mx-0 lg:mt-0 lg:max-w-none">
						<div class="relative rounded-lg shadow-xl">
							<div
								class="pointer-events-none absolute inset-0 rounded-lg border-2 border-thatOrange-400"
								aria-hidden="true" />
							<div class="absolute inset-x-0 top-0 translate-y-px transform">
								<div class="flex -translate-y-1/2 transform justify-center">
									<span
										class="inline-flex rounded-full bg-thatOrange-400 px-4 py-1 text-sm font-bold uppercase tracking-wider text-white">
										Best Value
									</span>
								</div>
							</div>
							<div class="rounded-t-lg bg-white px-6 pt-12 pb-10">
								<div>
									<h3 class="text-center text-2xl font-bold uppercase text-gray-500">
										{eventTickets['CAMPER'].name}
									</h3>
									<div class="mt-4 flex items-center justify-center">
										<span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
											<span class="mt-2 mr-2 text-4xl font-medium"> $ </span>
											<span class="font-extrabold">
												{eventTickets['CAMPER'].price}
											</span>
											<span class="mt-2 ml-2 text-xl font-medium tracking-wide text-gray-400">
												USD
											</span>
										</span>
									</div>
								</div>
							</div>
							<div
								class="rounded-b-lg border-t-2 border-gray-100 bg-gray-50 px-6 pt-10 pb-8 sm:px-10 sm:py-10">
								<ul class="space-y-4">
									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											Full access to all 4 days
										</p>
									</li>

									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											Daily Breakfast, Lunch and Beverages
										</p>
									</li>

									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											THAT t-shirt, badge, and swag
										</p>
									</li>
									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											Welcome Reception, Happy Hours and BBQ
										</p>
									</li>
									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">Waterpark Party</p>
									</li>
								</ul>
								<div class="mt-10">
									<div class="flex flex-col">
										<HighlightButton on:click={() => handleAddToCart('EVERYTHING_CAMPER')}>
											Purchase
										</HighlightButton>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="mx-auto mt-10 max-w-md lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3 lg:m-0 lg:max-w-none">
						<div
							class="flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-r-lg">
							<div class="flex flex-1 flex-col">
								<div class="bg-white px-6 py-10">
									<div>
										<h3 class="text-center text-2xl font-bold uppercase text-gray-500">
											Family Campers (starting at)
										</h3>
										<div class="mt-4 flex items-center justify-center">
											<span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
												<span class="mt-2 mr-2 text-4xl font-medium">$</span>
												<span class="font-extrabold"> 79 </span>
												<span class="mt-2 ml-2 text-xl font-medium tracking-wide text-gray-400">
													USD
												</span>
											</span>
										</div>
									</div>
								</div>
								<div
									class="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
									<ul class="space-y-4">
										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Family Sessions</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">
												Pig Roast and Waterpark Party
											</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">THAT t-shirt</p>
										</li>
									</ul>
									<div class="mt-8">
										<div class="flex flex-col">
											<ShellButton>
												<a data-sveltekit-prefetch class="py-2" href="tickets#families">
													More Information
												</a>
											</ShellButton>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-24 flex flex-col items-center">
			<div class="animate-pulse">
				<HighlightLink href={`/events/${event.slug}/tickets`}>
					<span class="text-xl font-bold uppercase tracking-wider"> View all ticket options </span>
				</HighlightLink>
			</div>
		</div>
	</div>
</div>
