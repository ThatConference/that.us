<script>
	// export let eventTicket;
	export let membership;

	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	import config from '$utils/config';

	import { Check, Ban } from '$elements/svgs';
	import { Standard as StandardButton, Highlight as HighlightButton } from '$elements/buttons';

	const { send } = getContext('cart');

	function handleAddMembershipClick(quantity = 1) {
		const isBulkPurchase = quantity > 1 ? true : false;
		send('ADD_ITEM', {
			eventId: config.eventId,
			...membership,
			isBulkPurchase,
			quantity
		});
		goto('/orders/summary/');
	}

	// function handleAddEventTicketClick(quantity = 1) {
	function handleAddEventTicketClick() {
		// const isBulkPurchase = quantity > 1 ? true : false;
		// send('ADD_ITEM', { ...eventTicket, isBulkPurchase, quantity });
		// goto('/orders/summary/');
		goto('/events/');
	}
</script>

<div>
	<div class="bg-thatBlue-800 px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
		<div class="flex flex-col items-center justify-center space-y-12">
			<p class="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
				You are not the product! We are.
			</p>

			<p class="mx-auto max-w-6xl text-center text-xl text-gray-300 sm:mt-5 sm:text-2xl">
				Our passion is people, communities, and helping one another become better than they were
				yesterday. We could create a free platform, but then you become the product. To that we say
				no thank you, we're the product. We're taking the approach of creating a monetization
				strategy of help us, help you.
			</p>
		</div>
	</div>

	<div class="pb-12 lg:pb-20">
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
										<h3 class="text-center text-2xl font-medium text-gray-900" id="tier-hobby">
											THAT Online Event Ticket
										</h3>
										<div class="strike mt-4 flex items-center justify-center">
											<span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
												<span class="mt-2 mr-2 text-4xl font-medium"> $ </span>
												<span class="font-extrabold"> 15 </span>
											</span>
											<span class="text-xl font-medium text-gray-500"> / per event </span>
										</div>
									</div>
								</div>
								<div
									class="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
									<p class="text-center text-lg text-red-500">
										For a limited time all monthly THAT Online events are <span
											class="font-extrabold">free</span> and do not require a ticket to participate.
									</p>

									<!-- <ul class="space-y-4">
										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Full Access to Event</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Join any Session</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Create any Session</p>
										</li>
									</ul> -->
									<div class="mt-8">
										<div class="flex flex-col">
											<StandardButton on:click={() => handleAddEventTicketClick()}>
												Upcoming Events
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
									<h3
										class="text-center text-3xl font-semibold text-gray-900 sm:-mx-6"
										id="tier-growth">
										THAT Membership
									</h3>
									<div class="mt-4 flex items-center justify-center">
										<span
											class="flex items-start px-3 text-6xl tracking-tight text-gray-900 sm:text-6xl">
											<span class="mt-2 mr-2 text-4xl font-medium"> $ </span>
											<span class="font-extrabold">
												{membership.price || ''}
											</span>
										</span>
										<span class="text-2xl font-medium text-gray-500"> / year </span>
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
											Access to all online monthly events
										</p>
									</li>

									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											$50 off 1 THAT Conference Camper Ticket
										</p>
									</li>

									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">10% off at THAT Store</p>
									</li>
									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											Yearly Commitment, Automatic Renewal
										</p>
									</li>
									<li class="flex items-start">
										<div class="flex-shrink-0">
											<span class="text-green-500"><Check /></span>
										</div>
										<p class="ml-3 text-base font-medium text-gray-500">
											First access to new platform features
										</p>
									</li>
								</ul>
								<div class="mt-10">
									<div class="flex flex-col">
										<HighlightButton on:click={() => handleAddMembershipClick()}>
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
										<h3 class="text-center text-2xl font-medium text-gray-900" id="tier-scale">
											Daily Usage
										</h3>
										<div class="mt-4 flex items-center justify-center">
											<span class="flex items-start px-3 text-6xl tracking-tight text-gray-900">
												<span class="font-extrabold"> Free </span>
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
											<p class="ml-3 text-base font-medium text-gray-500">Join Activities</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<span class="text-green-500"><Check /></span>
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">Create Activities</p>
										</li>

										<li class="flex items-start">
											<div class="flex-shrink-0">
												<Ban />
											</div>
											<p class="ml-3 text-base font-medium text-gray-500">
												Access to monthly events
											</p>
										</li>
									</ul>
									<div class="mt-8">
										<div class="flex flex-col">
											<StandardButton on:click={() => goto('/signup/')}>
												Create an Account
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
	</div>
</div>
