<script>
  // utilities
  import metaTagsStore from '../../../store/metaTags';
  import { thatProfile } from '../../../utilities/security.js';
  import { Warning } from '../../../elements/svgs';

  let awardedBadges = [];
  $: if ($thatProfile?.earnedMeritBadges) {
    awardedBadges = [...$thatProfile.earnedMeritBadges];
  }

  metaTagsStore.set({
    title: 'Merit Badges - THAT',
    description: "You've worked hard to earn some awesome merit badges.",
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/my/badges`,
    },
  });
</script>

<div>
  <header>
    <h2 class="text-xl leading-6 font-bold text-gray-900">Your Merit Badges</h2>
  </header>

  {#if awardedBadges.length > 0}
    <div class="mt-12">
      <div class="flex space-x-3 justify-around">
        {#each awardedBadges as badge (badge.id)}
          <div class="flex flex-col items-center">
            <img
              class="h-24 w-24"
              src="{badge.image}"
              alt="{badge.name}"
              loading="lazy" />
            <h2
              class="text-xl leading-6 font-bold tracking-tight text-gray-500">
              {badge.name}
            </h2>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="mt-8">
      <div class="flex items-center">
        <div class="mr-4">
          <Warning classes="h-12 w-12 text-red-500" />
        </div>

        <h2 class="prose-xl text-gray-500">
          Wait, our records seem to indicate you don't have a merit badge yet.
        </h2>
      </div>
    </div>
  {/if}
</div>
