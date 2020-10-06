<script>
  export let followers = [];

  import { Standard as StandardButton } from '../../elements/buttons';

  import { Avatars } from '../../elements';
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="lg:grid lg:grid-cols-12 lg:gap-8 mb-24">
    <div class="lg:col-span-3 w-full">
      <h2
        class="my-2 text-3xl leading-9 font-extrabold tracking-tight
              text-gray-900 sm:text-4xl sm:leading-10"
      >
        Newest Followers
      </h2>
    </div>

    <div class="lg:col-start-4 lg:col-span-9">
      <div class="flex flex-col">
        <div class="my-8 lg:my-0">
          <Avatars attendees="{followers}" />
        </div>

        {#if followers.length > 25}
          <div class="flex flex-row-reverse">
            <StandardButton class="h-3/4" on:click>
              View Everyone
            </StandardButton>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
