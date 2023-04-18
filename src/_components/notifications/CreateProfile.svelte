<script>
	let wasDismissed = false;
</script>

{#if !wasDismissed}
	<div class="relative bg-red-400">
		<div class="mx-auto max-w-screen-xl px-3 py-3 sm:px-6 lg:px-8">
			<div class="pr-16 sm:px-16 sm:text-center">
				<p class="font-medium text-white">
					<span class="hidden md:inline">
						To Favorite, Submit or Join any activity you will first need to complete your user
						profile.
					</span>
					<span class="block sm:ml-2 sm:inline-block">
						<a href="/my/profiles/primary/" class="font-bold text-white underline">
							Create Your Profile &rarr;
						</a>
					</span>
				</p>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-start pr-1 pt-1 sm:items-start
          sm:pr-2 sm:pt-1">
				<button
					type="button"
					class="flex rounded-md p-2 transition duration-150
            ease-in-out hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none"
					aria-label="Dismiss"
					on:click={() => (wasDismissed = !wasDismissed)}>
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
	</div>
{/if}
