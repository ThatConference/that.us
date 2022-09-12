<script>
	export let stateMachineService;

	import { useService } from '@xstate/svelte';

	import { Avatars } from '$elements';
	import { debug } from '$utils/config';

	const { state } = useService(stateMachineService, { devTools: debug.xstate });
</script>

{#if $state.matches('loaded')}
	<div class="bg-that-offWhite bg-opacity-50">
		<section class="mx-auto max-w-screen-xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
			<div class="lg:grid lg:grid-cols-12 lg:gap-8">
				<div class="text-center md:mx-auto md:max-w-2xl lg:col-span-3">
					<h2
						class="my-2 text-3xl font-extrabold leading-8 tracking-tight text-thatBlue-800 sm:text-4xl sm:leading-10">
						Our Followers
					</h2>
				</div>

				<div class="lg:col-span-9 lg:col-start-4">
					<div class="flex flex-col">
						<div class="my-8 lg:my-0">
							<Avatars attendees={$state.context.items} />
						</div>

						<!-- 
              <div class="flex flex-row-reverse">
                  <StandardButton class="h-3/4" on:click>
                    View Everyone
                  </StandardButton>
              </div> 
            -->
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}
