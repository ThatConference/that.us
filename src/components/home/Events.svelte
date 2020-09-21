<script>
  import { Link } from 'yrv';

  import Event from './Event.svelte';

  const events = [
    {
      title: 'THAT Online',
      date: 'August 3rd, 2020',
      description: `August 3rd, 2020 marks our first ever THAT Online. We’re
                      taking a different approach to the "virtual conference".
                      Our approach; create a platform removing artificial
                      boundaries, a safe place where we can ALL collaborate in a
                      more creative meaningful way, enabling our inner
                      practitioner. Of course we can to do it anytime, anywhere,
                      and any way we see fit.`,
      url: '/events/thatOnline',
      logoUrl: '/images/thatOnline.svg',
    },
    // {
    //   title: 'Day of the Dome',
    //   date: 'October 17th, 2020',
    //   description: `Cupim ham pastrami, chislic doner buffalo pig. Tri-tip pork chop andouille ham, corned beef filet mignon tail landjaeger sirloin chuck pork loin hamburger picanha. Meatball hamburger turkey frankfurter, porchetta chislic ham hock strip steak swine picanha alcatra tenderloin. Tongue flank fatback, leberkas cow jerky beef ribs. Leberkas filet mignon sausage meatball pork chop.`,
    //   url: '/events/dayOfTheDome',
    //   logoUrl: '/images/thatOnline.svg',
    // },
  ];
</script>

<section class="py-12 lg:py-16 bg-white">
  <div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
    <div class="space-y-12">
      <div class="w-full flex flex-col items-center">
        <h2
          class="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl"
        >
          View our Past Events. <span class="pl-2 text-that-orange">Join the
            Upcoming!</span>
        </h2>
      </div>

      <ul
        class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-y-8
          lg:gap-x-12 lg:space-y-0"
      >
        {#each events as e}
          <li>
            <Event {...e} />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
