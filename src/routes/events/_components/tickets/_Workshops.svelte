<script>
	export let event;

	import { createEventDispatcher } from 'svelte';

	import { Standard as StandardButton } from '$elements/buttons';
	import { CheckFull } from '$elements/svgs';

	const dispatch = createEventDispatcher();

	const worshopTicket = event.products
		.filter((p) => p.isEnabled)
		.find((p) => p.uiReference === 'WORKSHOPS');

	function handlePurchase(ref) {
		dispatch('purchase-hybrid-ticket', {
			eventId: event.id,
			ref
		});
	}
</script>

<div class="relative pt-12 sm:pt-16 lg:pt-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center">
			<div class="lg:w-3/4 lg:pr-12">
				<h2 class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
					Don't just watch, Do!
				</h2>

				<p class="mt-12 prose-xl text-gray-500">
					Join us for a jam-packed full day of multi-hour hands-on workshops the day before THAT
					Conference kicks off. This allows you to get deeper into specifics across various
					technologies and learn from industry leaders just as passionate about code as you are.
				</p>
			</div>

			<div class="hidden w-1/4 lg:flex justify-center">
				<img
					class="h-full w-full"
					src="/images/characters/what_to_expect_hands_on_learning.png"
					alt
				/>
			</div>
		</div>
	</div>

	<div class="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
		<div class="relative">
			<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
					<div class="flex-1 bg-white px-6 py-8 lg:p-12">
						<h3 class="text-2xl font-extrabold text-thatBlue-800 sm:text-3xl">
							Pre-Conference Workshops
						</h3>

						<p class="mt-6 prose-xl text-gray-500">
							This incredible opportunity enables you to work directly with professionals ready to
							share their knowledge and enthusiasm while helping you grow your career. Don't forget
							to bring your laptop.
						</p>

						<div class="mt-8">
							<div class="flex items-center">
								<h4
									class="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-thatOrange-400"
								>
									What's included
								</h4>
								<div class="flex-1 border-t-2 border-gray-200" />
							</div>

							<ul class="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
								<li class="flex items-start lg:col-span-1">
									<div>
										<span
											class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white"
										>
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">Event Access Monday 1/17</p>
								</li>

								<li class="flex items-start lg:col-span-1">
									<div>
										<span
											class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white"
										>
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">Lunch</p>
								</li>

								<li class="flex items-start lg:col-span-1">
									<div>
										<span
											class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white"
										>
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">THAT Badge</p>
								</li>

								<li class="flex items-start lg:col-span-1">
									<div>
										<span
											class="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white"
										>
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">Wifi, Power, and Caffeine</p>
								</li>
							</ul>
						</div>
					</div>

					<div
						class="py-8 px-6 text-center bg-gray-100 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12"
					>
						<div
							class="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900"
						>
							<span>${worshopTicket.price}</span>
						</div>
						<!-- <p class="mt-4 text-sm">
              <a href="#" class="font-medium text-gray-500 underline">
                View the Schedule
              </a>
            </p> -->

						<div class="mt-6">
							<StandardButton on:click={() => handlePurchase(worshopTicket.uiReference)}
								>Purchase</StandardButton
							>
						</div>
					</div>
				</div>

				<div class="py-4 flex justify-center lg:justify-end">
					<p class="italic text-red-500">
						*** please note workshops are only available in-person and will not be streamed.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
