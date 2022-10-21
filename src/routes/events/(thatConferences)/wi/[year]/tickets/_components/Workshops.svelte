<script>
	export let event;

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import { Standard as StandardButton } from '$elements/buttons';
	import { CheckFull } from '$elements/svgs';

	const { send } = getContext('cart');
	const worshopTicket = event.products
		.filter((p) => p.isEnabled)
		.find((p) => p.uiReference === 'WORKSHOPS');

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

<div id="workshops" class="relative pt-12 sm:pt-16 lg:pt-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center">
			<div class="lg:w-3/4 lg:pr-12">
				<h2 class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
					Don't just watch, Do!
				</h2>

				<p class="prose-xl mt-12 text-gray-500">
					Join us for a jam-packed full day of multi-hour hands-on workshops the day before THAT
					Conference kicks off. This allows you to get deeper into specifics across various
					technologies and learn from industry leaders just as passionate about code as you are.
				</p>
			</div>

			<div class="hidden w-1/4 justify-center lg:flex">
				<img
					class="h-full w-full"
					src="/images/characters/what_to_expect_hands_on_learning.png"
					alt />
			</div>
		</div>
	</div>

	<div class="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
		<div class="relative">
			<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
					<div class="flex-1 bg-white px-6 py-8 lg:p-12">
						<h3 class="text-2xl font-extrabold text-thatBlue-800 sm:text-3xl">
							Pre-Conference Workshops
						</h3>

						<p class="prose-xl mt-6 text-gray-500">
							This incredible opportunity enables you to work directly with professionals ready to
							share their knowledge and enthusiasm while helping you grow your career. Don't forget
							to bring your laptop.
						</p>

						<div class="mt-8">
							<div class="flex items-center">
								<h4
									class="flex-shrink-0 bg-white pr-4 text-sm font-semibold uppercase tracking-wider text-thatOrange-400">
									What's included
								</h4>
								<div class="flex-1 border-t-2 border-gray-200" />
							</div>

							<ul class="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0">
								<li class="flex items-start lg:col-span-1">
									<div>
										<span
											class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">
										Event Access {dayjs(event.startDate).format('dddd M/D')}
									</p>
								</li>

								<li class="flex items-start lg:col-span-1">
									<div>
										<span
											class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">Lunch</p>
								</li>

								<li class="flex items-start lg:col-span-1">
									<div>
										<span
											class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">THAT Badge</p>
								</li>

								<li class="flex items-start lg:col-span-1">
									<div>
										<span
											class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">Wifi, Power, and Caffeine</p>
								</li>
							</ul>
						</div>
					</div>

					<div
						class="bg-gray-100 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
						<div
							class="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
							<span>${worshopTicket.price}</span>
						</div>
						<!-- <p class="mt-4 text-sm">
              <a href="#" class="font-medium text-gray-500 underline">
                View the Schedule
              </a>
            </p> -->

						<div class="mt-6">
							<StandardButton on:click={() => handleAddToCart(worshopTicket.uiReference)}
								>Purchase</StandardButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
