<script>
	export let platform;
	export let orderId;
	export let orderAllocations = [];

	import { createEventDispatcher } from 'svelte';

	import { Busy } from '$elements';
	import { Shell } from '$elements/buttons';
	import TicketDetail from './TicketDetail.svelte';

	const dispatch = createEventDispatcher();
	const isAt = platform === 'AT_THAT';
	const ticketResults = [];

	$: canContinue = false;
	$: ticketError = false;

	$: allocatedAllocations = orderAllocations.filter((oa) => oa.isAllocated);

	function handleTicketCreated({ detail }) {
		ticketResults.push(detail.wasCreated);
		canContinue = false;

		if (orderAllocations.length - 1 === ticketResults.length) {
			ticketError = ticketResults.includes(false);
			canContinue = !ticketError;
		}
	}
</script>

<div class="space-y-4">
	<slot name="header" />
	<p class="prose prose-lg text-gray-500">
		You don't want to go camping naked, do you? We want to make sure you're set up with the correct
		gear, so make sure to fill out all of the items below. Please note that the tickets below might
		be listed in a different order than the previous page.
	</p>
</div>

{#if ticketError}
	<div class="mt-12">
		<h2 class="text-xl font-extrabold text-red-500">Well we sure didn't expect that.</h2>
		<p class="prose prose-lg mt-4 text-gray-500">
			The robots have failed us. There is an issue trying to complete your ticket. Please contact us
			so we can sort this out with you.
		</p>
		<div class="mt-4 flex">
			<a
				href={`mailto:hello@that.us?subject=Error Creating My Speaker Tickets&body=The robots have failed us. Order Id ${orderId}`}
				rel="noopener"
				target="_blank">
				<Shell>
					<div class="px-8 py-2 font-extrabold">Contact Us</div>
				</Shell>
			</a>
		</div>
	</div>
{:else}
	<div class="mt-12">
		{#if allocatedAllocations.length === 0}
			<div class="flex flex-1 items-center justify-between rounded-md border bg-gray-50 p-4">
				<h2 class="text-xl font-extrabold text-gray-800">Fetching Your Tickets...</h2>
				<Busy />
			</div>
		{:else}
			<h2 class="text-xl font-extrabold text-gray-800">Please complete each ticket.</h2>
			{#each allocatedAllocations as orderAllocation, i}
				<TicketDetail
					{orderId}
					{orderAllocation}
					isOpen={i === 0}
					on:ticket-created={handleTicketCreated} />
			{/each}
		{/if}
	</div>
{/if}

{#if canContinue}
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
{/if}
