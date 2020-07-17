<script>
  export let id;
  export let level;
  export let companyName;
  export let companyLogo;
  export let slug;
  export let linkedIn;
  export let github;
  export let youtube;
  export let instagram;
  export let twitter;
  export let facebook;
  export let twitch;
  export let socialLinks;
  export let __typename;

  import { Link } from 'yrv';
  import SocialLinks from '../../components/social/SocialLink.svelte';
</script>

<div class="flex-1 flex flex-col p-8">
  <Link open href="{`https://thatconference.com/partner/${slug}`}">
    <img
      class="w-32 h-32 flex-shrink-0 mx-auto"
      src="{`${companyLogo}`}"
      alt=""
    />

    <h3 class="mt-6 text-gray-900 text-sm leading-5 font-medium">
      {`${companyName}`}
    </h3>
  </Link>
  <dl class="mt-1 flex-grow flex flex-col justify-between">

    <!-- {#if jobTitle}
      <dt class="sr-only">Title</dt>
      <dd class="text-gray-500 text-sm leading-5">{jobTitle}</dd>
    {/if}

    {#if company}
      <dt class="sr-only">Company</dt>
      <dd class="text-gray-500 text-sm leading-5">{company}</dd>
    {/if} -->

    <dt class="sr-only">Social Links</dt>
    <dd class="mt-3">
      {#each socialLinks as link}
        <SocialLinks {...link} />
      {/each}
    </dd>
  </dl>
</div>
