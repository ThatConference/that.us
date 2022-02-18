<script>
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div
	class="fixed inset-0 z-50 overflow-hidden"
	on:click|stopPropagation={() => {
		dispatch('clicked-outside', 'clicked');
	}}
>
	<div class="absolute inset-0 overflow-hidden">
		<section
			in:fly={{ x: 400, duration: 500 }}
			out:fly={{ x: 400, duration: 500 }}
			class="absolute inset-y-0 right-0 flex max-w-full"
			on:click|stopPropagation={() => {}}
		>
			<div class="w-screen border-l-4 border-thatOrange-400 md:w-auto">
				<div class="flex h-full flex-col divide-y divide-gray-200 bg-white ">
					<div
						class="flex min-h-0 flex-1 flex-col space-y-6 overflow-y-scroll overscroll-none py-6"
					>
						<header class="px-4 sm:px-6">
							<div class="flex items-start justify-between space-x-3">
								<slot name="header" />
								<div class="flex h-7 items-center">
									<button
										type="button"
										on:click|stopPropagation
										aria-label="Close panel"
										class="text-gray-400 transition duration-150
										ease-in-out hover:text-gray-500"
									>
										<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
						</header>

						<div class="flex-1 px-4 sm:px-6">
							<div class="h-full">
								<slot />
							</div>
						</div>
					</div>

					<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
						<span class="inline-flex rounded-md shadow-sm">
							<slot name="panelActions" />
						</span>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
