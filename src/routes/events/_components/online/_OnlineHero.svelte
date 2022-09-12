<script>
	export let event;

	import { createEventDispatcher } from 'svelte';
	import dayjs from 'dayjs';

	import { ChevronRight } from '$elements/svgs';
	import { Code } from '$elements/svgs/illustrations';

	const ticket = event.products.filter((f) => f.isEnabled).find((e) => e.productType === 'TICKET');

	const dispatch = createEventDispatcher();
</script>

<div class="relative py-12 px-4">
	<div>
		<div class="mx-auto max-w-7xl lg:px-8">
			<div class="grid-cols-3 lg:grid lg:gap-12">
				<div
					class="col-span-3 px-4 sm:px-6 sm:text-center lg:col-span-2 lg:flex lg:items-center lg:px-0 lg:text-left">
					<div class="lg:py-24">
						<div class="transform transition duration-500 ease-in-out hover:scale-105">
							<button
								type="button"
								on:click={() => dispatch('purchase-event-ticket')}
								class="inline-flex items-center rounded-lg bg-white p-1 pr-2 text-base text-thatBlue-400 lg:text-sm">
								<div>
									<span
										class="rounded-md bg-thatOrange-400 px-3 py-1 text-xs font-semibold uppercase leading-5 tracking-wide text-white"
										>Tickets on Sale</span>
								</div>
								<span class="strike ml-4 text-sm font-semibold"
									>Only ${ticket.price}. Purchase today!</span>
								<ChevronRight />
							</button>
						</div>

						<div
							class="mt-6 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
							<h1
								class="block bg-gradient-to-r from-thatOrange-300 to-thatOrange-500 bg-clip-text text-transparent">
								{event.name}
							</h1>

							<h2
								class="mt-1 text-4xl font-extrabold tracking-tight text-white sm:mt-2 sm:text-6xl lg:mt-3 xl:text-6xl ">
								{dayjs(event.startDate).format('MMMM D, YYYY')}
							</h2>
						</div>
					</div>
				</div>

				<div class="mt-12 -mb-16 hidden sm:-mb-48 lg:relative lg:m-0 lg:block">
					<div class="mx-auto max-w-md sm:max-w-2xl lg:max-w-none">
						<Code
							classes="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" />
					</div>
				</div>

				<div class="col-span-3 mt-6 flex flex-col items-center space-y-6 font-extrabold">
					<div>
						<div class="transform transition duration-500 ease-in-out hover:scale-105">
							<a href={`/activities/${event.slug}`}>
								<span
									class="rounded-md bg-thatOrange-400 px-4 py-2 text-lg uppercase leading-5 tracking-wide text-white transition duration-500 ease-in-out hover:bg-thatOrange-500"
									>View Event Schedule</span>
							</a>
						</div>
					</div>

					<p class="text-lg lowercase italic tracking-tight text-white ">
						all dates/times are represented in your time zone.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
