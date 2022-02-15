<script>
	import { createEventDispatcher } from 'svelte';
	import { autoFocus, clickOutside } from '$elements/actions';

	const dispatch = createEventDispatcher();
	let reasonGiven;
</script>

<div
	class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50"
>
	<div class="fixed inset-0 transition-opacity">
		<div class="absolute inset-0 bg-gray-500 opacity-75" />
	</div>

	<div
		use:clickOutside
		on:click_outside
		class="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl sm:max-w-lg sm:w-full sm:p-6"
	>
		<div class="sm:flex sm:items-start">
			<div
				class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
			>
				<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732
            4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
			</div>

			<div class="flex-grow mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Decline Your Invitation</h3>

				<div class="mt-2">
					<p class="text-sm leading-5 text-gray-500">
						Please let us know your reason for declining.
					</p>
				</div>

				<div class="mt-4">
					<textarea
						bind:value={reasonGiven}
						rows="5"
						use:autoFocus
						class="text-sm w-full rounded-md"
					/>
				</div>
			</div>
		</div>

		<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
			<span class="flex rounded-md shadow-sm sm:ml-3 sm:w-auto">
				<button
					type="button"
					on:click={() => dispatch('speaker-decline', { reasonGiven })}
					class="inline-flex justify-center w-full rounded-md border
          border-transparent px-4 py-2 bg-red-600 text-base leading-6
          font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none
          focus:border-red-700 focus:ring-red transition ease-in-out
          duration-150 sm:text-sm sm:leading-5"
				>
					I'm Declining
				</button>
			</span>
		</div>
	</div>
</div>
