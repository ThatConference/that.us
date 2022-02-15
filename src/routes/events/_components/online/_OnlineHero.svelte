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
			<div class="lg:grid grid-cols-3 lg:gap-12">
				<div
					class="px-4 sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center col-span-3 lg:col-span-2"
				>
					<div class="lg:py-24">
						<div class="transition duration-500 ease-in-out transform hover:scale-105">
							<button
								type="button"
								on:click={() => dispatch('purchase-event-ticket')}
								class="inline-flex items-center text-thatBlue-400 bg-white rounded-lg p-1 pr-2 text-base lg:text-sm"
							>
								<div>
									<span
										class="px-3 py-1 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-thatOrange-400 rounded-md"
										>Tickets on Sale</span
									>
								</div>
								<span class="strike ml-4 text-sm font-semibold"
									>Only ${ticket.price}. Purchase today!</span
								>
								<ChevronRight />
							</button>
						</div>

						<div
							class="mt-6 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
						>
							<h1
								class="bg-clip-text text-transparent bg-gradient-to-r from-thatOrange-300 to-thatOrange-500 block"
							>
								{event.name}
							</h1>

							<h2
								class="mt-1 sm:mt-2 lg:mt-3 text-4xl sm:text-6xl xl:text-6xl tracking-tight font-extrabold text-white "
							>
								{dayjs(event.startDate).format("MMMM D, 'YY, h:mm A")}
							</h2>
						</div>
					</div>
				</div>

				<div class="hidden lg:block mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
					<div class="mx-auto max-w-md sm:max-w-2xl lg:max-w-none">
						<Code
							classes="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
						/>
					</div>
				</div>

				<div class="mt-6 col-span-3 font-extrabold space-y-6 flex flex-col items-center">
					<div>
						<div class="transition duration-500 ease-in-out transform hover:scale-105">
							<a href={`/activities/${event.slug}`}>
								<span
									class="px-4 py-2 text-white text-lg leading-5 uppercase tracking-wide bg-thatOrange-400 transition duration-500 ease-in-out hover:bg-thatOrange-500 rounded-md"
									>View Event Schedule</span
								>
							</a>
						</div>
					</div>

					<p class="text-lg italic lowercase tracking-tight text-white ">
						all dates/times are represented in your time zone.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
