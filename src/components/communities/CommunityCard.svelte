<script>
  export let community;
  let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';
</script>

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
  </div>
</div>
