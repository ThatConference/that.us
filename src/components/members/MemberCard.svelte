<script>
  export let firstName;
  export let lastName;
  export let jobTitle;
  export let company;
  export let profileImage;
  export let profileSlug;
  export let earnedMeritBadges = [];
  export let profileLinks = [];

  import { Link } from 'yrv';
  import SocialLinks from '../../components/social/SocialLink.svelte';
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
  import config from '../../config';

  let userProfileImage = profileImage
    ? `${profileImage}${imageCrop}`
    : config.defaultProfileImage;
</script>

<Link href="/members/{profileSlug}">
  <div
    class="h-full text-center bg-white rounded-lg shadow transform hover:scale-110 hover:bg-that-offWhite "
  >
    <div class="p-4 flex flex-col">
      <div>
        <span class="inline-block relative">
          <img
            class="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
            src="{userProfileImage}"
            alt=""
          />

          {#if earnedMeritBadges.length > 0}
            <span class="absolute bottom-0 left-0 block h-12 w-12">
              <img
                src="{earnedMeritBadges[0].image}"
                alt="{earnedMeritBadges[0].name}"
              />
            </span>
          {/if}
        </span>

        <h3
          class="mt-4 text-gray-500 text-md font-bold tracking-tight leading-5"
        >
          {`${firstName} ${lastName}`}
        </h3>
      </div>
      <div class="flex-grow">
        <dl class="mt-1 flex flex-col justify-between">
          {#if jobTitle}
            <dt class="sr-only">Title</dt>
            <dd class="text-gray-500 text-sm leading-5">{jobTitle}</dd>
          {/if}

          {#if company}
            <dt class="sr-only">Company</dt>
            <dd class="text-gray-500 text-sm leading-5">{company}</dd>
          {/if}

          <dt class="sr-only">Social Links</dt>
          <dd class="mt-2">
            {#each profileLinks as link}
              <SocialLinks href="{link.url}" network="{link.linkType}" />
            {/each}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</Link>
