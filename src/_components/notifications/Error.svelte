<script>
	export let message = 'Error';

	import { fade } from 'svelte/transition';
	import Icon from 'svelte-awesome';
	import { warning } from '$components/svelte-awesome-icons';

	let dismissed = false;
</script>

{#if !dismissed}
	<div class="fixed inset-x-0 bottom-0 z-50 pb-2 sm:pb-5" in:fade={{ duration: 1000 }}>
		<div class="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8">
			<div class="rounded-lg bg-red-400 p-2 shadow-lg sm:p-3">
				<div class="flex flex-wrap items-center justify-between">
					<div class="flex w-0 flex-1 items-center">
						<span class="flex rounded-lg p-2">
							<Icon data={warning} class="h-6 w-6 text-white" />
						</span>
						<p class="ml-3 truncate font-medium text-white">
							<span class="md:hidden">!</span>
							<span class="hidden md:inline">{message}</span>
						</p>
					</div>

					<div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
						<button
							type="button"
							class="-mr-1 flex rounded-md p-2 
              transition
              duration-150 ease-in-out 
              hover:bg-thatBlue-500 focus:bg-thatBlue-500 focus:outline-none"
							aria-label="Dismiss"
							on:click={() => (dismissed = !dismissed)}>
							<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
				<div class="mx-16 mt-2 italic text-white"><slot /></div>
			</div>
		</div>
	</div>
{/if}
