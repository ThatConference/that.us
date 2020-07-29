<script>
  export let id;
  export let firstName;
  export let lastName;
  export let jobTitle;
  export let company;
  export let profileImage;
  export let profileSlug;
  export let earnedMeritBadges = [];
  export let profileLinks = [];
  export let __typename;

  import { Link } from 'yrv';
  import SocialLinks from '../../components/social/SocialLink.svelte';
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
  import config from '../../config';

  let userProfileImage = profileImage
    ? `${profileImage}${imageCrop}`
    : config.defaultProfileImage;

  if (lastName.toUpperCase() === 'SELL') console.log({ earnedMeritBadges });
</script>

<div class="flex-1 flex flex-col p-8">
  <Link href="https://www.thatconference.com/member/{profileSlug}" open>

    <span class="inline-block relative">
      <img
        class="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
        src="{userProfileImage}"
        alt=""
      />

      {#if earnedMeritBadges.length > 0}
        <span class="absolute bottom-0 left-0 block h-12 w-14">
          <img
            src="{earnedMeritBadges[0].image}"
            alt="{earnedMeritBadges[0].name}"
          />
        </span>
      {/if}

    </span>

    <h3 class="mt-6 text-gray-900 text-sm leading-5 font-medium">
      {`${firstName} ${lastName}`}
    </h3>
  </Link>
  <dl class="mt-1 flex-grow flex flex-col justify-between">

    {#if jobTitle}
      <dt class="sr-only">Title</dt>
      <dd class="text-gray-500 text-sm leading-5">{jobTitle}</dd>
    {/if}

    {#if company}
      <dt class="sr-only">Company</dt>
      <dd class="text-gray-500 text-sm leading-5">{company}</dd>
    {/if}

    <dt class="sr-only">Social Links</dt>
    <dd class="mt-3">
      {#each profileLinks as link}
        <SocialLinks href="{link.url}" network="{link.linkType}" />
      {/each}
    </dd>
  </dl>
</div>
