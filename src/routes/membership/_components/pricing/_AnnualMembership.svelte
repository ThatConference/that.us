<script>
	export let membership;

	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	import config from '$utils/config';
	import { Check } from '$elements/svgs';
	import { Highlight as HighlightButton } from '$elements/buttons';

	const { send } = getContext('cart');

	function handleAddMembershipClick(quantity = 1) {
		const isBulkPurchase = quantity > 1 ? true : false;
		send('ADD_ITEM', {
			eventId: config.eventId,
			...membership,
			isBulkPurchase,
			quantity
		});
		goto('/orders/summary');
	}
</script>

<div class="text-white">
	<div class="pb-16 xl:flex xl:items-center xl:justify-between">
		<div>
			<h1 class="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
				<span class="">THAT Membership Only</span>
				<span class="text-thatOrange-400">${membership.price} per year</span>
			</h1>
			<p class="mt-5 text-xl">
				Includes every online event, every feature and even a discount to THAT Conference.
			</p>
		</div>

		<HighlightButton on:click={() => handleAddMembershipClick()}>Purchase Now</HighlightButton>
	</div>

	<div class="border-t border-gray-200 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
		<div>
			<h2 class="text-base font-semibold text-thatOrange-400 tracking-wide uppercase">
				A Peer to Peer Learning System
			</h2>
			<p class="mt-2 text-3xl font-extrabold">Supporting Our Future</p>
			<p class="mt-4 text-lg">
				Why create a membership? It helps us support future platform growth and better manage a
				yearly budget. It allows us to focus more time on creating a better platform for all of us
				to use every day.
			</p>
		</div>
		<div class="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:mt-0 xl:col-span-2">
			<ul class="divide-y divide-gray-200">
				<li class="py-4 flex md:py-0 md:pb-4">
					<Check />
					<span class="ml-3 text-base">Access to all online events</span>
				</li>

				<li class="py-4 flex">
					<Check />
					<span class="ml-3 text-base">$50 off 1 THAT Conference Camper ticket</span>
				</li>

				<li class="py-4 flex">
					<Check />
					<span class="ml-3 text-base">10% off THAT Store merchandise</span>
				</li>

				<li class="py-4 flex">
					<Check />
					<span class="ml-3 text-base"> Yearly commitment, automatic renewal </span>
				</li>
			</ul>
			<ul class="border-t border-gray-200 divide-y divide-gray-200 md:border-t-0">
				<li class="py-4 flex md:border-t-0 md:py-0 md:pb-4">
					<Check />
					<span class="ml-3 text-base"> First access to new platform features </span>
				</li>

				<li class="py-4 flex">
					<Check />
					<span class="ml-3 text-base"> Help shape future releases </span>
				</li>

				<li class="py-4 flex">
					<Check />
					<span class="ml-3 text-base">Special Merit Badge</span>
				</li>

				<li class="py-4 flex">
					<Check />
					<span class="ml-3 text-base"> Supporting future platform growth </span>
				</li>
			</ul>
		</div>
	</div>
</div>
