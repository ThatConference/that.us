<script>
	export let showCloseButton = false;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div
	class="flex items-center gap-x-6 rounded-lg bg-thatBlue-500 px-6 py-2.5 before:flex-1 sm:px-3.5">
	<div class="text-lg leading-6 text-white">
		<slot />
	</div>

	<div class="flex flex-1 justify-end">
		{#if showCloseButton}
			<button
				type="button"
				class="-m-3 p-3 focus-visible:outline-offset-[-4px]"
				on:click={() => dispatch('dismiss')}>
				<span class="sr-only">Dismiss</span>
				<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
				</svg>
			</button>
		{/if}
	</div>
</div>
