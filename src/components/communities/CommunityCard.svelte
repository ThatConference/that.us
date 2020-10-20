<script>
  export let community;

  import { Link } from 'yrv';

  import SocialLinks from '../../components/social/SocialLink.svelte';
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
  import config from '../../config';
</script>

<Link href="/communities/{community.slug}">
  <div class="bg-white transform hover:scale-110 hover:bg-that-offWhite">
    <div class="text-center rounded-lg shadow flex-1 flex flex-col p-4">
      <span class="relative flex ">
        <img
          class="mx-auto max-h-32 "
          src="{community.logo}"
          alt="{community.name}"
        />
      </span>

      <h3
        class="mt-4 text-gray-900 leading-5 text-sm font-semibold tracking-tight uppercase"
      >
        {`${community.name}`}
      </h3>

      <div class="mt-2">
        <p class="text-gray-500 text-sm leading-5">
          {community.followCount}
          followers
        </p>
        <p class="text-gray-500 text-sm leading-5">
          {community.sessionCount}
          activities
        </p>
      </div>
    </div>
  </div>
</Link>
