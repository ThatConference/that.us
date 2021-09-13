<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Circle3 } from 'svelte-loading-spinners';

	import { createAuth } from '$utils/security';
	import { CheckFull } from '$elements/svgs';

	const dispatch = createEventDispatcher();

	const { isLoading, token, isAuthenticated } = createAuth();

	$: {
		if (!$isLoading && $token && $isAuthenticated) dispatch('LOADED', true);
	}
</script>

<div
	class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center
  sm:justify-center z-50"
>
	<div class="fixed inset-0 transition-opacity">
		<div class="absolute inset-0 bg-gray-500 opacity-75" />
	</div>

	<div
		class="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
	>
		<div class="sm:flex sm:items-start">
			<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
				<div>
					<ol class="pt-4">
						<li fade={{ delay: 100, duration: 500 }} class="relative">
							<div class="relative p-3 flex items-center group">
								<span class="flex items-center">
									<span
										class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500"
										class:bg-thatOrange-500={$isAuthenticated}
									>
										{#if $isAuthenticated}
											<span in:fade class="relative flex items-center justify-center">
												<CheckFull height="h-8" width="w-8" />
											</span>
										{:else}
											<Circle3
												size={'60'}
												unit={'px'}
												ballTopLeft="#f74646"
												ballTopRight="#ff834d"
												ballBottomLeft="#26529A"
												ballBottomRight="#555555"
											/>
										{/if}
									</span>
								</span>
								<span class="ml-4 min-w-0 flex flex-col items-start">
									<span class="text-xl font-semibold tracking-wide uppercase"
										>Authenticating Human</span
									>
								</span>
							</div>
						</li>

						<li fade={{ delay: 300, duration: 500 }} class="relative">
							<div class="relative p-3 flex items-center group">
								<span class="flex items-center">
									<span
										class="relative z-10 p-3 w-10 h-10 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500"
										class:bg-thatOrange-500={!$isLoading}
									>
										{#if !$isLoading}
											<span in:fade class="relative flex items-center justify-center">
												<CheckFull height="h-8" width="w-8" />
											</span>
										{:else}
											<Circle3
												size={'60'}
												unit={'px'}
												ballTopLeft="#f74646"
												ballTopRight="#ff834d"
												ballBottomLeft="#26529A"
												ballBottomRight="#555555"
											/>
										{/if}
									</span>
								</span>
								<span class="ml-4 min-w-0 flex flex-col">
									<span class="text-xl font-semibold tracking-wide uppercase"
										>Profile Hydration</span
									>
								</span>
							</div>
						</li>

						<li fade class="relative">
							<div class="relative p-3 flex items-center group">
								<span class="flex items-center">
									<span
										class="relative z-10 p-3 w-10 h-10 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500"
										class:bg-thatOrange-500={$token}
									>
										{#if $token}
											<span in:fade class="relative flex items-center justify-center">
												<CheckFull height="h-8" width="w-8" />
											</span>
										{:else}
											<Circle3
												size={'60'}
												unit={'px'}
												ballTopLeft="#f74646"
												ballTopRight="#ff834d"
												ballBottomLeft="#26529A"
												ballBottomRight="#555555"
											/>
										{/if}
									</span>
								</span>
								<span class="ml-4 min-w-0 flex flex-col">
									<span class="text-xl font-semibold tracking-wide uppercase">Packing Tokens</span>
								</span>
							</div>
						</li>

						<li fade class="relative pb-4">
							<div class="relative p-3 flex items-center group">
								<span class="flex items-center">
									<span
										class="relative z-10 p-3 w-10 h-10 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500"
										class:bg-thatOrange-500={$isAuthenticated}
									>
										{#if $isAuthenticated}
											<span in:fade class="relative flex items-center justify-center">
												<CheckFull height="h-8" width="w-8" />
											</span>
										{:else}
											<Circle3
												size={'60'}
												unit={'px'}
												ballTopLeft="#f74646"
												ballTopRight="#ff834d"
												ballBottomLeft="#26529A"
												ballBottomRight="#555555"
											/>
										{/if}
									</span>
								</span>
								<span class="ml-4 min-w-0 flex flex-col">
									<span class="text-xl font-semibold tracking-wide uppercase">Fetching Data</span>
								</span>
							</div>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</div>
