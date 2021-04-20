<script>
  import { getClient } from '@urql/svelte';

  import Warning from '../../../components/notifications/Warning.svelte';
  import ClaimTicketForm from '../../../components/my/ClaimTicketForm.svelte';

  // data
  import memberApi from '../../../dataSources/api.that.tech/members/mutations';

  // utilities
  import metaTagsStore from '../../../store/metaTags';
  import logEvent from '../../../utilities/eventTrack';
  import { tagEvent } from '../../../utilities/gtag';

  import { user, thatProfile, refreshMe } from '../../../utilities/security.js';

  const { claimTicket } = memberApi(getClient());

  let awardedBadge;
  let failedClaim = false;

  let awardedBadges = [];
  $: if ($thatProfile.earnedMeritBadges) {
    awardedBadges = [...$thatProfile.earnedMeritBadges];
  }

  async function handleClaimTicket({
    detail: { values, setSubmitting, resetForm },
  }) {
    failedClaim = false;

    const { ticketReference } = values;
    const badgeEarned = await claimTicket(ticketReference);

    if (badgeEarned) {
      tagEvent('badgeClaimed', 'account', badgeEarned.id);

      logEvent('badge_claimed');

      awardedBadge = badgeEarned;

      await refreshMe();
      resetForm();
    } else {
      failedClaim = true;
    }

    tagEvent('claim_badge', 'account', $user.sub);
    setSubmitting(false);
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
  {#if awardedBadges.length > 0}
    <div>
      <h2 class="text-xl leading-6 font-bold text-gray-900">Merit Badges</h2>

      <div class="mt-12">
        <div class="flex space-x-3 justify-around">
          {#each awardedBadges as badge (badge.id)}
            <div class="flex flex-col items-center">
              <img class="h-24 w-24" src="{badge.image}" alt="{badge.name}" />
              <h2
                class="text-xl leading-6 font-bold tracking-tight text-gray-500"
              >
                {badge.name}
              </h2>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <div class="mt-12 border-t">
    <div class="pt-6">
      <ClaimTicketForm handleSubmit="{handleClaimTicket}" />
    </div>
  </div>
</div>

{#if failedClaim}
  <Warning
    message="We were unable to claim that ticket number. Please re-check and try
    again."
  />
{/if}
