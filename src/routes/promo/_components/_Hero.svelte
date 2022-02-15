<script>
	export let event;

	import { createEventDispatcher } from 'svelte';
	import lodash from 'lodash';

	import { Shell as StandardShell } from '$elements/buttons';
	import { Check, Ban } from '$elements/svgs';
	import { Highlight as HighlightLink } from '$elements/links';

	const { keyBy } = lodash;
	const dispatch = createEventDispatcher();

	const { products } = event;
	const eventTickets = keyBy(
		products.filter((t) => t.uiReference),
		(i) => i.uiReference
	);

	function handlePurchase(ref) {
		dispatch('purchase-promo-ticket', {
			eventId: event.id,
			ref
		});
	}
</script>

<div>
	<div class="bg-thatBlue-800 pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
		<div class="flex flex-col items-center justify-center space-y-12">
			<div class="relative text-center text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
				<p>Are you on your own?</p>
				<p class="text-thatOrange-400">Let us help!</p>
			</div>

			<p class="text-center max-w-6xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
				Are you paying for your own ticket? Did your company's educational budget disappear? Or
				maybe you're someone who is a freelancer or a student trying to get into the community. For
				a limited time, we're offering one post-pandemic fantastic promotion to join us either ON
				THAT or AT THAT. Restrictions apply.
			</p>

			<div class="flex flex-col">
				<div class="animate-pulse">
					<HighlightLink href={`/events/${event?.slug}/tickets`}>
						<span class="text-xl uppercase font-bold tracking-wider">
							View all ticket options
						</span>
					</HighlightLink>
				</div>
			</div>
		</div>
	</div>

	<div class="pb-12">
		<div class="bg-gradient-to-b from-thatBlue-800">
			<div class="pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24">
				<div class="relative">
					<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div
							class="max-w-md mx-auto space-y-4 lg:max-w-6xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0"
						>
							<div class="relative flex flex-col rounded-lg shadow-lg">
								<div>
									<div class="absolute inset-0 rounded-lg border-t-2 border-thatOrange-500" />
									<div class="absolute inset-x-0 top-0 transform translate-y-px">
										<div class="flex justify-center transform -translate-y-1/2">
											<span
												class="inline-flex rounded-full bg-thatOrange-500 px-6 py-1 text-md font-bold tracking-wider uppercase text-white"
											>
												ON THAT
											</span>
										</div>
									</div>
								</div>
								<div class="px-6 py-8 rounded-t-lg bg-white sm:p-10 sm:pb-6">
									<div class="flex items-center justify-between">
										<div class="pt-12">
											<h3 class="text-2xl font-medium text-gray-900">
												{eventTickets['PROMO_VIRTUAL_CAMPER'].name}
											</h3>

											<div class="flex">
												<div>
													<span class="line-through text-red-500">
														<span
															class="px-3 flex items-start text-5xl tracking-tight text-gray-900"
														>
															<span class="mt-2 mr-2 text-3xl font-medium"> $ </span>
															<span class="font-extrabold">
																{eventTickets['VIRTUAL_CAMPER'].price}
															</span>
														</span>
													</span>
												</div>

												<div>
													<span class="px-3 flex items-start text-5xl tracking-tight text-gray-900">
														<span class="mt-2 mr-2 text-3xl font-medium"> $ </span>
														<span class="font-extrabold">
															{eventTickets['PROMO_VIRTUAL_CAMPER'].price}
														</span>
													</span>
												</div>
											</div>
										</div>

										<div>
											<img class="h-32" src={event.logo} alt="Event Logo" />
										</div>
									</div>
								</div>
								<div
									class="relative flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6"
								>
									<p class="mt-5 text-lg text-gray-500">
										{eventTickets['PROMO_VIRTUAL_CAMPER'].shortDescription}
									</p>

									<ul class="space-y-4">
										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base text-gray-700">Promotional Pricing</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base text-gray-700">Keynotes</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base text-gray-700">Join and create virtual sessions</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base text-gray-700">THAT t-shirt (US Only)</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Ban />
											</div>
											<p class="ml-3 text-base text-gray-700">Access to AT THAT sessions</p>
										</li>
									</ul>

									<div class="relative mt-2 p-4">
										<StandardShell>
											<button
												type="button"
												on:click={() => handlePurchase('PROMO_VIRTUAL_CAMPER')}
												class="w-full px-8 md:px-10 py-2"
											>
												Purchase
											</button>
										</StandardShell>
									</div>
								</div>
							</div>

							<div class="relative flex flex-col rounded-lg shadow-lg">
								<div>
									<div class="absolute inset-0 rounded-lg border-t-2 border-thatOrange-500" />
									<div class="absolute inset-x-0 top-0 transform translate-y-px">
										<div class="flex justify-center transform -translate-y-1/2">
											<span
												class="inline-flex rounded-full bg-thatOrange-500 px-6 py-1 text-md font-bold tracking-wider uppercase text-white"
											>
												AT THAT
											</span>
										</div>
									</div>
								</div>

								<div class="px-6 py-8 rounded-t-lg bg-white sm:p-10 sm:pb-6">
									<div class="flex items-center justify-between">
										<div class="pt-12">
											<h3 class="text-2xl font-medium text-gray-900">
												{eventTickets['PROMO_CAMPER_NO_FOOD'].name}
											</h3>

											<div class="flex">
												<div>
													<span class="line-through text-red-500">
														<span
															class="px-3 flex items-start text-5xl tracking-tight text-gray-900"
														>
															<span class="mt-2 mr-2 text-3xl font-medium"> $ </span>
															<span class="font-extrabold">
																{eventTickets['CAMPER_NO_FOOD'].price}
															</span>
														</span>
													</span>
												</div>

												<div>
													<span class="px-3 flex items-start text-5xl tracking-tight text-gray-900">
														<span class="mt-2 mr-2 text-3xl font-medium"> $ </span>
														<span class="font-extrabold">
															{eventTickets['PROMO_CAMPER_NO_FOOD'].price}
														</span>
													</span>
												</div>
											</div>
										</div>
										<div>
											<img class="h-32" src={event.logo} alt="Event Logo" />
										</div>
									</div>
								</div>

								<div
									class="relative flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6"
								>
									<p class="mt-5 text-lg text-gray-500">
										{eventTickets['PROMO_CAMPER_NO_FOOD'].shortDescription}
									</p>
									<ul class="space-y-4">
										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base text-gray-700">Promotional Pricing</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base text-gray-700">Full Access to main event</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base text-gray-700">THAT t-shirt, badge, and swag</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base text-gray-700">
												Welcome Reception, Game Night, Waterpark Party
											</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Ban />
											</div>
											<p class="ml-3 text-base text-gray-700">Workshops</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Ban />
											</div>
											<p class="ml-3 text-base text-gray-700">No access to any food, or drink</p>
										</li>
									</ul>

									<div class="relative mt-2 p-4">
										<StandardShell>
											<button
												type="button"
												on:click={() => handlePurchase('PROMO_CAMPER_NO_FOOD')}
												class="w-full px-8 md:px-10 py-2"
											>
												Purchase
											</button>
										</StandardShell>
									</div>
								</div>
							</div>
						</div>
						<div class="relative py-4 flex justify-center lg:justify-end">
							<p class="italic text-red-500">
								***This promotion is only valid for Campers paying their own way.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
