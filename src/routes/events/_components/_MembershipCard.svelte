<script>
	export let event;

	import { createEventDispatcher } from 'svelte';

	import { Highlight as HighlightButton } from '$elements/buttons';
	import { CheckFull } from '$elements/svgs';

	const membershipDetails = event.products
		.filter((f) => f.isEnabled)
		.find((e) => e.productType === 'MEMBERSHIP');

	const dispatch = createEventDispatcher();

	function handlePurchaseMembershipOnClick() {
		dispatch('purchase-membership');
	}
</script>

<div class="relative bg-thatBlue-100 bg-opacity-25">
	<div class="pt-12 sm:pt-16 lg:pt-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<slot name="header" />
		</div>
	</div>
	<div class="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
		<div class="relative">
			<div class="absolute inset-0 h-1/2" />
			<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
					<div class="flex-1 bg-white px-6 py-8 lg:p-12">
						<h3 class="text-2xl font-extrabold text-thatBlue-800 sm:text-3xl">THAT Membership</h3>
						<p class="mt-6 text-base text-gray-500">
							Includes every online event, every feature and even a discount to
							<span class="px:2 text-that-orange hover:text-thatOrange-500">
								<a href="https://thatconference.com?utm_source=THAT"> THAT Conference </a>
							</span>
							while helping us manage our yearly budget.
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
								<li class="flex items-center lg:col-span-1">
									<div>
										<span
											class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">
										Free Tickets to THAT Online and ON THAT Conference
									</p>
								</li>

								<li class="flex items-center lg:col-span-1">
									<div>
										<span
											class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">$50 off AT THAT Conference Camper ticket</p>
								</li>

								<li class="flex items-center lg:col-span-1">
									<div>
										<span
											class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">10% off THAT Store merchandise</p>
								</li>

								<li class="flex items-center lg:col-span-1">
									<div>
										<span
											class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
											<CheckFull height="h-4" width="h-4" />
										</span>
									</div>
									<p class="ml-3 text-sm text-gray-700">Access to the private Members Discord</p>
								</li>
							</ul>
						</div>
					</div>
					<div
						class="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
						<p class="text-lg font-medium leading-6 text-gray-900">
							Year Commitment, Automatic Renewal
						</p>

						<div class="mt-4 flex items-center justify-center">
							<span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
								<span class="mr-2 text-4xl font-medium">$</span>
								<span class="font-extrabold">{membershipDetails.price}</span>
								<span class="mt-2 ml-2 text-xl font-medium tracking-wide text-gray-400"> USD </span>
							</span>
						</div>

						<p class="mt-4 text-sm">
							<a href="/membership/" class="font-medium text-gray-500 underline"> Learn More </a>
						</p>
						<div class="mt-8">
							<div class="flex flex-col">
								<HighlightButton on:click={handlePurchaseMembershipOnClick}>
									Purchase
								</HighlightButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
