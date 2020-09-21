<script>
  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';

  import { FeaturedActivity } from '../../elements';

  // datasources
  import sessionsApi from '../../dataSources/api.that.tech/sessions';
  import currentEvent from '../../store/currentEvent';

  const { querySessionsByDate } = sessionsApi(getClient());
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
          Upcoming Activities
        </h2>
        <p class="text-xl leading-7 text-gray-300">
          Check out these activities currently on the schedule. <span
            class="pl:2 text-that-orange hover:text-thatOrange-500"
          >
            <Link href="/activities">View all upcoming activities.</Link>
          </span>
        </p>
      </div>

      {#await querySessionsByDate($currentEvent.eventId)}
        <p>loading...</p>
      {:then activities}
        <ul
          class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0
            lg:grid-cols-3 lg:gap-8"
        >
          {#each activities.slice(0, 6) as s (s.id)}
            <li>
              <FeaturedActivity {...s} />
            </li>
          {/each}
        </ul>
      {:catch error}
        <p>OH NO</p>
      {/await}
    </div>
  </div>
</section>
