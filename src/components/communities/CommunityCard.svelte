<script>
  export let community;
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
</script>

<span class="relative flex">
  <img
    class="mx-auto max-h-32 "
    src="{community.logo}"
    alt="{community.name}"
  />
</span>

<h3
  class="mt-4 text-gray-500 font-bold leading-5 text-md tracking-tight uppercase"
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
