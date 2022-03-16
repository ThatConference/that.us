<script>
	export let stateMachineService;

	import { fade } from 'svelte/transition';
	import { useService } from 'xstate-svelte';

	import { debug } from '$utils/config';
	import lodash from 'lodash';
	import { FeaturedActivity, FeaturedActivityAdd } from '$elements/activities';

	const { state, send } = useService(stateMachineService, {
		devTools: debug.xstate
	});
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl">
					Upcoming
					{#if $state.context.meta.name}
						<span class="text-that-orange">{$state.context.meta.name}</span>
					{/if}
					Activities
				</h2>
				<p class="text-xl leading-7 text-gray-300">
					Check out these activities currently on the schedule.
					<span class="pl:2 text-that-orange hover:text-thatOrange-500">
						<a href="/activities/">
							View all of the upcoming
							{#if $state.context.meta.name}
								{$state.context.meta.name}
							{/if}
							activities.
						</a>
					</span>
				</p>
			</div>

			<ul class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
				{#if $state.matches('loaded')}
					{#if $state.context.items.length > 0}
						{#each $state.context.items as s (s.id)}
							<li in:fade>
								<FeaturedActivity {...lodash.pick(s, ['id', 'title', 'speakers', 'startTime'])} />
							</li>
						{/each}
					{/if}
				{/if}

				{#if $state.context.items.length < 6}
					<li class="h-full w-full" in:fade>
						<FeaturedActivityAdd />
					</li>
				{/if}
			</ul>

			<div class="flex justify-end">
				{#if ['loaded'].some($state.matches)}
					<button
						type="button"
						on:click={() => send('NEXT')}
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

				{#if ['loadedAll'].some($state.matches)}
					<button
						type="button"
						on:click={() => send('REFRESH')}
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
