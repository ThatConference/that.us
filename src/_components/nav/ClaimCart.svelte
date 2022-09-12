<script>
	import { getContext } from 'svelte';
	import Ticket from '$elements/svgs/Ticket.svelte';

	const { state } = getContext('claimTicket');
</script>

{#if ['claim.pending'].some($state.matches)}
	<div class="relative flex items-center justify-center">
		<div class="ml-4 rounded-full p-1 hover:bg-thatBlue-500 hover:text-white focus:text-white">
			<a href="/orders/claim/">
				<Ticket />
				<span class="absolute bottom-0 right-0 block animate-pulse">
					<span
						class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-thatRed-500" />
				</span>
			</a>
		</div>
	</div>
{/if}
