<script>
  export let companyName;
  export let companyLogo;
  export let socialLinks;

  import SocialLinks from '../../components/social/SocialLink.svelte';
</script>

<div class="flex-1 flex flex-col p-4">
  <img
    class="w-32 h-16 flex-shrink-0 mx-auto"
    src="{`${companyLogo}`}"
    alt=""
  />

  <h3 class="mt-2 text-gray-900 text-sm leading-5 font-medium">
    {`${companyName}`}
  </h3>
  <dl class="mt-1 flex-grow flex flex-col justify-between">
    <dt class="sr-only">Social Links</dt>
    <dd class="mt-2">
      {#each socialLinks as link}
        <SocialLinks {...link} />
      {/each}
    </dd>
  </dl>
</div>
