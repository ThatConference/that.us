<script>
  import { Link } from 'yrv';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import WelcomeQuote from './_WelcomeQuote.svelte';

  import {
    Highlight as HighlightLink,
    Standard as StandardLink,
  } from '../../elements/links';
</script>

<Layout>
  <div class="py-16 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-base max-w-prose mx-auto lg:max-w-none">
        <p
          class="text-base leading-6 text-thatOrange-400 font-semibold
            tracking-wide uppercase"
        >
          Getting Started
        </p>
        <h1
          class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
            text-gray-900 sm:text-4xl sm:leading-10"
        >
          Welcome to THAT!
        </h1>
      </div>
      <div
        class="relative text-base max-w-prose mx-auto mb-8 lg:max-w-5xl lg:mx-0
          lg:pr-72"
      >
        <p class="text-lg text-gray-500 leading-7">
          Here at THAT It's our mission to make the best community of geeks on
          this planet. A community of people who want to help one another each
          and every day.
        </p>
      </div>
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
        <div class="relative mb-12 lg:mb-0">
          <div class="mb-10 prose text-gray-500 mx-auto lg:max-w-none">
            <p>Things you should know:</p>
            <ul>
              <li>
                <Link href="/activities">Join an upcoming activity.</Link>
              </li>
              <li>
                <Link href="/activities/create">Creating an activity.</Link>
              </li>
              <li>
                <Link href="/activities/create">Staying up to date.</Link>
              </li>
            </ul>
            <p>TODO</p>
            <h2>Why THAT?</h2>
            <p>todo</p>
          </div>
          <div
            class="flex space-x-4 text-base max-w-prose mx-auto lg:max-w-none"
          >
            <StandardLink href="/activities">Upcoming Activities</StandardLink>
            <HighlightLink href="/support/join-activity">
              Joining an Activity
            </HighlightLink>
          </div>
        </div>
        <div class="relative text-base max-w-prose mx-auto lg:max-w-none">
          <WelcomeQuote />
        </div>
      </div>
    </div>
  </div>
</Layout>
