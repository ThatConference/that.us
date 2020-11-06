<script>
  export let stateMachineService;

  import { useService } from 'xstate-svelte';

  // import { Standard as StandardButton } from '../../elements/buttons';
  import { Avatars } from '../../elements';
  import { debug } from '../../config';

  const { state } = useService(stateMachineService, { devTools: debug.xstate });
</script>

{#if $state.matches('loaded')}
  {#if $state.context.items.length > 0}
    <div class="bg-that-offWhite bg-opacity-50">
      <section
        class="mx-auto py-12 px-4 max-w-screen-xl sm:px-6 lg:px-8 lg:py-24"
      >
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="text-center md:max-w-2xl md:mx-auto lg:col-span-3">
            <h2
              class="my-2 text-3xl leading-8 font-extrabold tracking-tight
      text-gray-900 sm:text-4xl sm:leading-10"
            >
              My Followers
            </h2>
          </div>

          <div class="lg:col-start-4 lg:col-span-9">
            <div class="flex flex-col">
              <div class="my-8 lg:my-0">
                <Avatars attendees="{$state.context.items}" />
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
{/if}
