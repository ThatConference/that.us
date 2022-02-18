<script>
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$elements/actions';
	import { Shell } from '$elements/buttons';

	const dispatch = createEventDispatcher();
</script>

<div
	class="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
>
	<div class="fixed inset-0 transition-opacity">
		<div class="absolute inset-0 bg-gray-500 opacity-75" />
	</div>

	<div
		use:clickOutside
		on:click_outside
		class="relative overflow-hidden rounded-lg bg-white p-10 shadow-xl sm:w-full sm:max-w-3xl"
	>
		<div class="flex flex-col">
			<div class="flex items-center space-x-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
					<svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213
										2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1
										1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0
										00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>

				<h3 class="text-lg font-medium leading-6 text-gray-900">
					Warning! THAT New Feature Ahead.
				</h3>
			</div>

			<div class="mt-3 flex-grow text-center sm:mt-0 sm:ml-4 sm:text-left">
				<slot />
			</div>
		</div>

		<div class="mt-6 sm:mt-8 sm:flex sm:flex-row-reverse">
			<button on:click={() => dispatch('close')} type="button">
				<Shell>
					<div class="px-8 py-2 font-extrabold">Ok</div>
				</Shell>
			</button>
		</div>
	</div>
</div>
