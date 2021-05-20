<script>
  import { getClient } from '@urql/svelte';
  import dayjs from 'dayjs';
  import { router } from 'yrv';

  import Layout from '../../elements/layouts/ContentLayout.svelte';

  import {
    StandardScroll,
    Standard as StandardLink,
  } from '../../elements/links';
  import metaTagsStore from '../../store/metaTags';
  import eventsApi from '../../dataSources/api.that.tech/events/queries';

  import FAQ from './components/cfp/_FAQ.svelte';
  import Perks from './components/cfp/_Perks.svelte';
  import EventMeta from './components/cfp/_EventMeta.svelte';
  import CTA from './components/cfp/_CTA.svelte';

  const { state, year } = $router.params;
  const eventSlug = `${state}/${year}`;

  function queryEvent() {
    return eventsApi(getClient()).queryEventForCfp(eventSlug);
  }

  metaTagsStore.set({
    title: 'Call For Counselors - THAT',
    description: 'Call For Counselors is now open',
    openGraph: {
      type: 'website',
      url: `https://that.us/activities/call-for-counselors`,
    },
  });
</script>

{#await queryEvent() then event}
  <Layout>
    <div class="py-20 overflow-hidden">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start">
          <div class="text-center sm:text-left col-span-5">
            <h2 class="text-thatOrange-400 text-2xl">
              Submissions Now Open Through
              <span class="font-extrabold">
                {dayjs(event.callForSpeakersCloseDate).format(
                  'dddd, MMMM D, YYYY',
                )}
              </span>
            </h2>
          </div>

          <div class="col-span-2">
            <h1
              class="text-center sm:text-left pb-16 text-4xl tracking-tight
              leading-10 font-extrabold text-thatBlue-800 sm:text-5xl
              sm:leading-none md:text-6xl">
              Call for Camp Counselors
            </h1>
          </div>

          <div class="space-y-8 col-span-3">
            <p class="prose-2xl text-gray-500">
              Are you ready to speak at the biggest tech conference in the US
              Midwest? We are searching for hour-long sessions, half and
              full-day workshops, and keynotes that bring value to our
              community. The sessions and workshops can appeal to developers,
              designers, testers, business owners, site builders, community
              organizers, and everything in-between.
            </p>

            <div class="flex space-x-4 justify-center">
              <div class="flex-none">
                <StandardLink href="{`/activities/create#/event/${event.id}`}">
                  Become a Counselor
                </StandardLink>
              </div>

              <div class="flex-none">
                <StandardScroll href="#formatAndDates">
                  View Formats and Dates
                </StandardScroll>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative mt-24">
        <EventMeta event="{event}" />
      </div>

      <div class="mt-24 bg-that-navy">
        <div class="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 ">
          <div class="lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start">
            <div class="col-span-5">
              <h3
                class="text-center sm:text-left uppercase tracking-wide text-white font-extrabold text-4xl">
                Summer Camp for Geeks
              </h3>
            </div>

            <div class="col-span-3">
              <p class="prose-xl text-white">
                THAT Conference is the largest tech event in the US Midwest, and
                it’s held at a waterpark. We are a family-friendly conference
                and encourage children (geeklings) to submit talks as well! We
                are looking for counselors on a wide variety of topics and
                backgrounds. Do you have a story to tell? Do you have expertise
                in a specific field to share? We want to hear from you!
              </p>
            </div>
            <div
              class="hidden lg:visible col-span-2 lg:flex flex-col items-center">
              <img
                class="flip sm:absolute sm:transform sm:translate-y-24 h-1/8 sm:h-2/3"
                src="/images/characters/bear-pig.png"
                alt />
            </div>
          </div>
        </div>
      </div>

      <div id="formatAndDates"></div>

      <div class="relative mt-24">
        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div class="flex flex-col justify-center text-center">
            <h2
              class="text-4xl font-extrabold tracking-tighter uppercase text-thatBlue-800">
              Speak Online or In-Person, you decide.
            </h2>
          </div>

          <div class="mt-12">
            <p class="text-center pt-4 prose-lg text-gray-500">
              Dare we say we've gone "digital-first"? Sounds fancy, right? The
              truth is we're a believer in continuous refactoring, and let's be
              honest, the resort isn't big enough for the camp we want to set
              up. THAT Conference is now comprised of two primary delivery
              methods, online or in-person.
            </p>
            <div class="pt-12 flex">
              <div class="flex flex-col justify-center">
                <img
                  src="/images/characters/what_to_expect_tech_stack.png"
                  class="h-24 w-full object-scale-down"
                  alt="a computer"
                  loading="lazy" />
              </div>
              <p class="flex-grow text-left pt-4 prose-lg text-gray-500">
                Online activities are solely delivered online, authentic to
                their audience. They are meant to be very interactive, global,
                and happen at any time for any length of time. They're limited
                to 100 people, but some of the best, most engaging activities
                happen with just a few geeks. The possibilities are endless, and
                we're excited to have this addition.
              </p>
            </div>
            <div class="pt-12 flex">
              <p class="flex-grow text-left pt-4 prose-lg text-gray-500">
                In-person activities are just that; they're physically in-person
                and also authentic to their audience. Typically they're
                orchestrated with a single speaker and limited by time and
                physical space.
              </p>
              <div class="flex flex-col justify-center">
                <img
                  src="/images/characters/what_to_expect_professional_networking.png"
                  class="h-24 w-full object-scale-down"
                  alt="two geeks high fiving"
                  loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-24">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div class="lg:grid lg:grid-cols-2 lg:gap-32 lg:items-start">
            <div class="mt-8 flex flex-col space-y-6">
              <div>
                <h2
                  class="text-center sm:text-left text-4xl font-extrabold tracking-tighter uppercase text-thatBlue-800">
                  Audiences And Formats
                </h2>
              </div>
              <div>
                <p class="prose-lg text-gray-500">
                  You can apply to speak for the following audiences and
                  formats:
                </p>
              </div>

              <div>
                <h3 class="text-lg font-extrabold tracking-wide text-gray-600">
                  Professional & Family Formats
                </h3>

                <p class="pt-4 prose-lg text-gray-500">
                  THAT Conference is a professional polyglot technical
                  conference with a rich experience for children and other
                  family members. Your session could be aimed at the
                  professional track or for family "geeklings".
                </p>
              </div>

              <div>
                <h3 class="text-lg font-extrabold tracking-wide text-gray-600">
                  Standard Sessions
                </h3>

                <p class="pt-4 prose-lg text-gray-500">
                  Standard sessions are 60 minutes each, including time for
                  answering questions. There is a 30-minute break in-between
                  each session to nurture those all-important hallway
                  conversations.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-extrabold tracking-wide text-gray-600">
                  Pre-Conference Workshops
                </h3>

                <p class="pt-4 prose-lg text-gray-500">
                  Half-day (four hours) or full-day (8 hours), the day leading
                  into THAT Conference is set aside for a full day of workshops.
                  Be prepared to provide attendees a decent agenda for what
                  you'll cover.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-extrabold tracking-wide text-gray-600">
                  Keynotes
                </h3>

                <p class="pt-4 prose-lg text-gray-500">
                  Do you have what it takes to give a 90-minute speech on
                  something you're passionate about? You'll have an audience of
                  over 1,000 people in front of the stage listening to your
                  story. We want topics that'll motivate, energize, and help
                  attendees see the world differently as the diverse place it
                  is.
                </p>
              </div>
            </div>

            <!-- right side -->
            <div class="mt-8 flex flex-col space-y-6">
              <div>
                <h2
                  class="text-center sm:text-left text-4xl font-extrabold tracking-tighter uppercase text-thatBlue-800">
                  Key Dates You Need To Know
                </h2>
              </div>

              <div>
                <div class="divide-y divide-gray-200">
                  {#each event.milestones as milestone}
                    <div class="py-4 grid grid-cols-2">
                      <div
                        class="text-lg font-extrabold tracking-wide text-gray-500">
                        {dayjs(milestone.dueDate).format('MMMM D, YYYY')}
                      </div>
                      <div class="prose-lg text-gray-500">
                        {milestone.title}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <div class="inline-block relative">
                <img
                  src="/images/characters/what_to_expect_4_days.png"
                  class="h-48 flex-shrink-0 mx-auto"
                  alt="a calendar"
                  loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative mt-24">
      <Perks event="{event}" />
    </div>

    <div class="relative mt-24">
      <CTA event="{event}" />
    </div>

    <div class="relative mt-24">
      <FAQ />
    </div>
  </Layout>
{/await}

<style>
  .flip {
    transform: scaleX(-1);
  }
</style>
