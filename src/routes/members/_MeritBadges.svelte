<script>
  export let meritBadges = [];
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="lg:grid lg:grid-cols-12 lg:gap-8 my-24">
    <div class="lg:col-span-4 w-full">
      <h2
        class="my-2 text-3xl leading-9 font-extrabold tracking-tight
              text-gray-900 sm:text-4xl sm:leading-10"
      >
        My Merit Badges
      </h2>
    </div>

    <div class="lg:col-start-5 lg:col-span-9">
      <div class="my-8 lg:my-0">
        <div class="flex justify-center lg:justify-start space-x-4">
          {#each meritBadges as badge}
            <div class="flex flex-col items-center">
              <img
                class="h-24 w-24"
                src="{badge.image}"
                alt="{badge.name}"
                title="{badge.name}"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
