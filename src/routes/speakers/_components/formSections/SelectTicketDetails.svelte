<script>
	export let platform;
	export let orderId;
	export let orderAllocations = [];

	import { createEventDispatcher } from 'svelte';

	import { Busy } from '$elements';
	import { Shell } from '$elements/buttons';
	import TicketDetail from './TicketDetail.svelte';

	const isAt = platform === 'AT_THAT';
	const dispatch = createEventDispatcher();

	$: allocatedAllocations = orderAllocations.filter((oa) => oa.isAllocated);
</script>

<div class="space-y-4">
	<slot name="header" />
	<p class="prose prose-lg text-gray-500">
		You don't want to go camping naked, do you? We want to make sure you're set up with the correct
		gear, so make sure to fill out all of the items below. Please note that the tickets below might
		be listed in a different order than the previous page.
	</p>
</div>

<div class="mt-12">
	{#if allocatedAllocations.length === 0}
		<div class="p-4 flex-1 flex items-center justify-between border rounded-md bg-gray-50">
			<h2 class="text-xl text-gray-800 font-extrabold">Fetching Your Tickets...</h2>
			<Busy />
		</div>
	{:else}
		<h2 class="text-xl text-gray-800 font-extrabold">Please complete each ticket.</h2>
		{#each allocatedAllocations as orderAllocation, i}
			<TicketDetail {orderId} {orderAllocation} isOpen={i === 0} />
		{/each}
	{/if}
</div>

<div class="mt-12">
	<div class="flex justify-end">
		<button on:click={() => dispatch('submit-step')}>
			<Shell>
				<div class="px-8 py-2 font-extrabold">
					{#if isAt}
						Next, Emergency Contact
					{:else}
						Next, Next Steps
					{/if}
				</div>
			</Shell>
		</button>
	</div>
</div>
