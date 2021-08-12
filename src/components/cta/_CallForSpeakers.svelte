<script>
  export let event;

  import dayjs from 'dayjs';
  import advancedFormat from 'dayjs/plugin/advancedFormat';

  import { Highlight as HighlightLink } from '../../elements/links';

  dayjs.extend(advancedFormat);
</script>

<div class="mt-24 bg-that-navy">
  <div class="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 ">
    <div class="lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start">
      <div class="col-span-5">
        <h3
          class="text-center sm:text-left uppercase tracking-wide text-white font-extrabold text-4xl">
          Call For Counselors is Open
        </h3>
      </div>

      <div class="col-span-3">
        <p class="text-xl leading-7 text-gray-300">
          Don't delay, call for counselors closes on

          <span
            class="pl:2 text-that-orange font-extrabold hover:text-thatOrange-500">
            {dayjs(event.callForSpeakersCloseDate).format(
              'dddd, MMMM D, YYYY z',
            )}
          </span>
        </p>

        <div class="pt-12">
          <HighlightLink
            href="{`/activities/call-for-counselors/${event.slug}`}">
            Learn More
          </HighlightLink>
        </div>
      </div>

      <div class="hidden lg:visible col-span-2 lg:flex flex-col items-center">
        <img
          class="flip sm:absolute sm:transform sm:translate-y-24 h-1/8 sm:h-2/3"
          src="/images/characters/bear-pig.png"
          alt />
      </div>
    </div>
  </div>
</div>

<style>
  .flip {
    transform: scaleX(-1);
  }
</style>
