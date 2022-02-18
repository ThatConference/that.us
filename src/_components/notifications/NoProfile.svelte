<script>
	export let text = 'Create, Favorite, or Join';

	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from 'svelte-awesome';
	import { warning } from '$components/svelte-awesome-icons';
	import { show } from '$stores/profileNotification';

	let popNotification = false;
	let dismissed = false;

	const unsubscribe = show.subscribe((value) => {
		popNotification = value;

		if (value) dismissed = false;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if popNotification}
	{#if !dismissed}
		<div class="fixed inset-x-0 bottom-0 pb-2 sm:pb-5" in:fade={{ duration: 1000 }}>
			<div class="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8">
				<div class="rounded-lg bg-red-400 p-2 shadow-lg sm:p-3">
					<div class="flex flex-wrap items-center justify-between">
						<div class="flex w-0 flex-1 items-center">
							<span class="flex rounded-lg p-2">
								<Icon data={warning} class="h-6 w-6 text-white" />
							</span>
							<p class="ml-3 truncate font-medium text-white">
								<span class="md:hidden">!</span>
								<span class="hidden md:inline">
									You cannot
									<span class="font-bold">{text}</span>
									a activity until you've completed your user profile.
								</span>
							</p>
						</div>
						<div
							class="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0
                sm:w-auto"
						>
							<div class="rounded-md shadow-sm">
								<a
									href="/my/profiles/primary/"
									class="flex items-center justify-center rounded-md border border-transparent
                    bg-white px-4 py-2 text-sm font-medium
                    leading-5 text-indigo-600 transition
                    duration-150 ease-in-out hover:text-indigo-500
                    focus:outline-none focus:ring"
								>
									Create Profile
								</a>
							</div>
						</div>
						<div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
							<button
								type="button"
								class="-mr-1 flex rounded-md p-2 transition
                  duration-150 ease-in-out hover:bg-indigo-500 focus:bg-indigo-500
                  focus:outline-none"
								aria-label="Dismiss"
								on:click={() => (dismissed = !dismissed)}
							>
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
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
				</div>
			</div>
		</div>
	{/if}
{/if}
