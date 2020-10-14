<script>
  // todo...
  export let activityName = '';
  export let activities = [];

  import { Link } from 'yrv';
  
  import { FeaturedActivity, FeaturedActivityAdd } from '../../elements';
</script>

<section class="py-12 lg:py-16 bg-thatBlue-700">
  <div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
    <div class="space-y-12">
      <div
        class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none"
      >
        <h2
          class="text-3xl leading-9 font-extrabold text-white tracking-tight
            sm:text-4xl"
        >
          Upcoming
          {#if activityName}
            <span class="text-that-orange">{activityName}</span>
          {/if}
          Activities
        </h2>
        <p class="text-xl leading-7 text-gray-300">
          Check out these activities currently on the schedule.
          <span class="pl:2 text-that-orange hover:text-thatOrange-500">
            <Link href="/activities">
              View all of the upcoming
              {activityName}
              activities.
            </Link>
          </span>
        </p>
      </div>

      <ul
        class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0
      lg:grid-cols-3 lg:gap-8"
      >
        {#if activities.length > 0}
          {#each activities.slice(0, 6) as s (s.id)}
            <li>
              <FeaturedActivity {...s} />
            </li>
          {/each}
        {/if}

        {#if activities.length < 6}
          <li>
            <FeaturedActivityAdd />
          </li>
        {/if}
      </ul>
      <div class="flex justify-end">
        <button
          on:click
          class="px-8 py-2 rounded-md shadow text-base leading-6
            bg-that-blue  
            text-white

            hover:bg-thatBlue-400
            
            focus:bg-thatBlue-400 
            focus:text-white 
            focus:outline-none
            focus:shadow-outline-thatBlue-500 
            focus:border-thatBlue-800 
            
            transition duration-150 ease-in-out md:text-lg md:px-10"
        >
          <span>
            View Next
          </span>
        </button>

      </div>
    </div>
  </div>
</section>
