<script>
	export let title;
	export let text;

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let close = false;

	onMount(() => {
		return setTimeout(() => (close = true), 2000);
	});
</script>

{#if !close}
	<div
		class="pointer-events-none fixed inset-0 flex items-end justify-center px-4
		py-6 sm:items-start sm:justify-end sm:p-6"
		in:fade={{ duration: 1000 }}>
		<div class="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg">
			<div class="overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5">
				<div class="p-4">
					<div class="flex items-start">
						<div class="flex-shrink-0">
							<svg
								class="h-6 w-6 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="ml-3 w-0 flex-1 pt-0.5">
							<p class="text-sm font-medium leading-5 text-gray-900">{title}</p>
							<p class="mt-1 text-sm leading-5 text-gray-500">{text}</p>
						</div>
						<div class="ml-4 flex flex-shrink-0">
							<button
								type="button"
								class="inline-flex text-gray-400 transition
								duration-150 ease-in-out focus:text-gray-500 focus:outline-none"
								on:click={() => (close = !close)}>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0
										111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10
										11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293
										5.707a1 1 0 010-1.414z"
										clip-rule="evenodd" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
