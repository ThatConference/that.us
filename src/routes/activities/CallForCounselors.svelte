<script>
  import { Link } from 'yrv';
  import { fade } from 'svelte/transition';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import { Shell as ShellButton } from '../../elements/buttons';

  // import WelcomeQuote from './support/_WelcomeQuote.svelte';
  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Call For Counselors - THAT',
    description: 'XXX',
    openGraph: {
      type: 'website',
      url: `https://that.us/activities/call-for-counselors`,
    },
  });
  //https://www.thatconference.com/wi/2021/call-for-counselors#process
</script>

<Layout>
  <div class="py-20 overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start">
        <div class="col-span-2">
          <h1
            class="sm:text-center lg:text-left pb-16 text-4xl tracking-tight uppercase
          leading-10 font-extrabold text-thatBlue-700 sm:text-5xl
          sm:leading-none md:text-6xl">
            Call for Counselors
          </h1>
        </div>

        <div class="space-y-4 col-span-3">
          <p class="prose-2xl text-gray-500">
            Are you ready to speak at the biggest tech conference in the US
            Midwest? We are searching for hour-long sessions, half and full-day
            workshops, and keynotes that bring value to our audience. The
            sessions and workshops can appeal to developers, designers,
            bloggers, business owners, site builders, translators, community
            organizers, and everything in-between.
          </p>

          <div class="flex space-x-4 justify-center">
            <div class="flex-none">
              <ShellButton>
                <button
                  class="w-full px-8 md:px-10 py-4 text-md leading-5 font-semibold ">
                  Become a Counselor
                </button>
              </ShellButton>
            </div>

            <div class="flex-none">
              <ShellButton>
                <button
                  class="w-full px-8 md:px-10 py-4 text-md leading-5 font-semibold ">
                  View Formats and Dates
                </button>
              </ShellButton>
            </div>
          </div>
        </div>
      </div>

      <main>
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <section>
            <ol class="overflow-hidden">
              <li
                class="relative pb-10"
                in:fade="{{ delay: 100, duration: 500 }}">
                <div
                  class="-ml-px absolute mt-0.5 top-4 left-13 w-1 h-full bg-thatOrange-500">
                </div>

                <!-- Complete Step -->
                <Link
                  class="relative p-3 flex items-center group"
                  on:click="{() => login('/my/settings/profile', true)}">
                  <span class="h-20 flex items-center">
                    <span
                      class="relative z-10 p-3 w-20 h-20 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white">
                      <span class="font-extrabold text-5xl">1</span>
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col">
                    <span class="text-xl font-semibold tracking-wide uppercase"
                      >Create Your Login</span>
                    <span class="text-lg text-gray-500">
                      You will need an account to create or join any activities.
                    </span>
                  </span>
                </Link>
              </li>
              <li
                class="relative pb-10"
                in:fade="{{ delay: 300, duration: 500 }}">
                <div
                  class="-ml-px absolute mt-0.5 top-4 left-13 w-1 h-full bg-thatOrange-500">
                </div>

                <Link
                  href="/my/settings/profile"
                  class="relative p-3 flex items-center group">
                  <span class="h-20 flex items-center">
                    <span
                      class="relative z-10 p-3 w-20 h-20 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white">
                      <span class="font-extrabold text-5xl">2</span>
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col">
                    <span class="text-xl font-semibold tracking-wide uppercase"
                      >Tell Us About Yourself</span>
                    <span class="text-lg text-gray-500">
                      Tell everyone a bit about who you are and where to find
                      you on the internet.
                    </span>
                  </span>
                </Link>
              </li>
              <li
                class="relative pb-10"
                in:fade="{{ delay: 500, duration: 500 }}">
                <Link
                  href="/support/welcome"
                  class="relative p-3 flex items-center group">
                  <span class="h-20 flex items-center">
                    <span
                      class="relative z-10 p-3 w-20 h-20 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white">
                      <span class="font-extrabold text-5xl">3</span>
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col">
                    <span class="text-xl font-semibold tracking-wide uppercase"
                      >Get Started!</span>
                    <span class="text-lg text-gray-500">
                      We've put together a few words on how to get started with
                      THAT.
                    </span>
                  </span>
                </Link>
              </li>
            </ol>
          </section>
          <!-- <div class="relative text-base max-w-prose mx-auto lg:max-w-none">
            <WelcomeQuote />
          </div> -->
        </div>
      </main>
    </div>
  </div>
</Layout>
