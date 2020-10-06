<script>
  export let activities = [];

  import { Link } from 'yrv';

  import { FeaturedActivityDetail } from '../../elements';
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
          My Upcoming
          <span class="text-that-orange">Activities</span>
        </h2>
        <p class="text-xl leading-7 text-gray-300">
          Check out my upcoming activities currently on the schedule,
          <span class="pl:2 text-that-orange hover:text-thatOrange-500">
            <Link href="/activities">or view all upcoming activities.</Link>
          </span>
        </p>
      </div>

      <ul
        class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0
      lg:grid-cols-3 lg:gap-8"
      >
        {#each activities.slice(0, 6) as s (s.id)}
          <li>
            <FeaturedActivityDetail {...s} />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
