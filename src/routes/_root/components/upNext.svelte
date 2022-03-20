<script>
	export let items = [];
	export let hasMore = false;

	import { createEventDispatcher } from 'svelte';
	import lodash from 'lodash';
	import { fade } from 'svelte/transition';

	import { FeaturedActivity, FeaturedActivityAdd } from '$elements/activities';

	const dispatch = createEventDispatcher();
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2
					class=" text-2xl  font-extrabold uppercase text-white antialiased sm:text-3xl lg:text-4xl xl:text-5xl">
					Upcoming Activities
				</h2>
				<p class="text-xl leading-7 text-gray-300">
					Check out these activities currently on the schedule.
					<span class="pl:2 text-that-orange hover:text-thatOrange-500">
						<a href="/activities/"> View all of the upcoming activities. </a>
					</span>
				</p>
			</div>

			<ul class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
				{#if items.length > 0}
					{#each items as s (s.id)}
						<li in:fade>
							<FeaturedActivity {...lodash.pick(s, ['id', 'title', 'speakers', 'startTime'])} />
						</li>
					{/each}
				{/if}

				{#if items.length < 6}
					<li class="h-full w-full" in:fade>
						<FeaturedActivityAdd />
					</li>
				{/if}
			</ul>

			<div class="flex justify-end">
				{#if hasMore}
					<button
						type="button"
						on:click={() => dispatch('next')}
						class="rounded-md bg-that-blue px-8 py-2 text-base leading-6
                    text-white  
                    shadow
                    transition
                    duration-150 
                    ease-in-out 
                    hover:bg-thatBlue-400
                    focus:border-thatBlue-800 
                    focus:bg-thatBlue-400 focus:text-white focus:ring-white md:px-10 md:text-lg">
						<span>View Next</span>
					</button>
				{/if}

				{#if !hasMore && items.length > 6}
					<button
						type="button"
						on:click={() => dispatch('refresh')}
						class="rounded-md bg-that-blue px-8 py-2 text-base leading-6
                      text-white  
                      shadow
                      transition
                      duration-150 
                      ease-in-out 
                      hover:bg-thatBlue-400
                      focus:border-thatBlue-800 
                      focus:bg-thatBlue-400 focus:text-white focus:ring-white md:px-10 md:text-lg">
						<span>Refresh</span>
					</button>
				{/if}
			</div>
		</div>
	</div>
</section>
