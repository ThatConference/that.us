<script>
	import { getContext } from 'svelte';

	import Busy from '$elements/Busy.svelte';
	import { Standard as StandardButton } from '$elements/buttons';

	const { state, send } = getContext('claimTicket');

	const clearCart = () => send('CLEAR_CLAIM');
	const claimTicket = () => send('CLAIM_TICKET');
</script>

<div class="relative w-full max-w-7xl">
	<div class="flex items-center justify-between px-4 sm:px-6 lg:px-8">
		<h2 class="text-lg font-medium text-gray-900">Claim Your Ticket</h2>
	</div>

	<div
		class="mx-6 flex transform rounded-xl bg-gray-100 px-8 py-6 text-left text-base transition sm:my-8">
		{#if ['claim.new'].some($state.matches)}
			<div>You currently have no tickets in your cart.</div>
		{/if}

		{#if ['claim.pending'].some($state.matches)}
			<a href="/events/{$state.context.eventDetails?.slug}">
				<img
					src={$state.context.eventDetails?.logo}
					alt="Event Logo"
					class="h-12 w-12 flex-none sm:h-24 sm:w-24" />
			</a>

			<!-- <div class="ml-4 grid grid-cols-3 place-items-center gap-6"> -->
			<div class="ml-4 grid grid-cols-5 place-items-center gap-6">
				<div class="col-span-2">
					<h3 class="font-medium text-gray-900">
						<a href="/events/{$state.context.eventDetails?.slug}"
							>{$state.context.eventDetails?.name || 'THAT Online'}</a>
					</h3>
					<p class="mt-1 text-gray-500">Online Event Ticket</p>
				</div>

				<p class="font-semibold text-gray-900">FREE</p>

				<div class="col-span-2 flex items-center space-x-4 sm:text-center">
					<StandardButton on:click={clearCart}>Remove</StandardButton>

					{#if ['verification.verified'].some($state.matches)}
						<StandardButton on:click={claimTicket}>Claim Ticket</StandardButton>
					{:else}
						<button
							type="button"
							disabled
							class="whitespace-nowrap rounded-md border-2 
							border-gray-500 bg-gray-200 px-8 py-2 
							text-base font-medium
							leading-6 text-gray-500 shadow md:px-10 md:text-lg">
							Claim Ticket
						</button>
					{/if}
				</div>
			</div>
		{/if}

		{#if ['claim.claimingTicket'].some($state.matches)}
			<div class="flex space-x-6">
				<Busy size="30" />
				<div>processing ticket...</div>
			</div>
		{/if}

		{#if ['claim.ticketClaimed'].some($state.matches)}
			<div>ticket claimed</div>
		{/if}
	</div>
</div>
