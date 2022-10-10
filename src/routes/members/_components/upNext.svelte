<script>
	export let profileSlug;

	import { useMachine } from '@xstate/svelte';

	import { debug } from '$utils/config.public';
	import { FeaturedActivityDetail } from '$elements';

	import activityMachine from '../_machines/activities';

	const { state } = useMachine(activityMachine({ profileSlug }), {
		devTools: debug.xstate
	});
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2
					class="text-3xl font-extrabold leading-9 tracking-tight text-white
            sm:text-4xl">
					My Upcoming
					<span class="text-that-orange">Activities</span>
				</h2>
				<p class="text-xl leading-7 text-gray-300">
					Check out my upcoming activities currently on the schedule,
					<span class="pl:2 text-that-orange hover:text-thatOrange-500">
						<a href="/activities/">or view all upcoming activities.</a>
					</span>
				</p>
			</div>

			<ul
				class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0
      lg:grid-cols-3 lg:gap-8">
				{#if $state.matches('loaded')}
					{#if $state.context.items.length > 0}
						<!-- slicing off and taking the first 6 as we don't have paging on the API -->
						{#each $state.context.items.slice(0, 6) as s (s.id)}
							<li>
								<FeaturedActivityDetail {...s} />
							</li>
						{/each}
					{/if}
				{/if}
			</ul>

			<!-- 
        TODO. Stubbed out for once we have paging on the API ready. The statemachine already supports it.

        <div class="flex justify-end">
          {#if ['loaded'].some($state.matches)}
            <button
              on:click="{() => send('NEXT')}"
              class="px-8 py-2 rounded-md shadow text-base leading-6
                      bg-that-blue text-white hover:bg-thatBlue-400
                      focus:bg-thatBlue-400 focus:text-white focus:outline-none
                      focus:ring-thatBlue-500 focus:border-thatBlue-800 
                      transition duration-150 ease-in-out md:text-lg md:px-10"
            >
              <span>View Next</span>
            </button>
          {/if}

          {#if ['loadedAll'].some($state.matches)}
            <button
              on:click="{() => send('REFRESH')}"
              class="px-8 py-2 rounded-md shadow text-base leading-6
                        bg-that-blue  
                        text-white
                        hover:bg-thatBlue-400
                        focus:bg-thatBlue-400 
                        focus:text-white 
                        focus:outline-none
                        focus:ring-thatBlue-500 
                        focus:border-thatBlue-800 
                        transition duration-150 ease-in-out md:text-lg md:px-10"
            >
              <span>Refresh</span>
            </button>
          {/if}
        </div>
      -->
		</div>
	</div>
</section>
