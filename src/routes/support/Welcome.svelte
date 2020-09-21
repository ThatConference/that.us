<script>
  import { Link } from 'yrv';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import WelcomeQuote from './_WelcomeQuote.svelte';

  import {
    Highlight as HighlightLink,
    Standard as StandardLink,
  } from '../../elements/links';

  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Getting Started - THAT!',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/support/welcome`,
    },
  });
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
          lg:pr-72 text-lg text-gray-500 leading-7"
      >
        <p>
          Here at THAT, it's our mission to help foster the best community of
          geeks on this planet. We're grateful you're here and now we want to
          make sure you have the information you need to get involved with THAT.
        </p>

        <p class="mt-8">
          In short, anyone, at anytime can create what we call an activity. The
          format of an activity is simple, a video call in the browser, no tools
          required. Every activity has a chat window, you're able to share your
          desktop, your webcam and mic are enabled. Our goal is to create the
          best virtual face to face converation possible but give you the room
          to have any type of conversation you need.
        </p>
      </div>
      <div
        class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start text-base text-lg
          text-gray-500 leading-7"
      >
        <div class="relative mb-12 lg:mb-0">
          <div
            class="mb-10 prose mx-auto lg:max-w-none text-base text-lg
              text-gray-500 leading-7"
          >
            <p>Website actions you should know how to do:</p>
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
              <li>
                <Link href="/my/profile">Keep your profile up to date.</Link>
              </li>
            </ul>

            <h2>Why THAT?</h2>

            <p>
              It’s our mission to connect you to others creating a safe place to
              have the conversations we should be having each and every day.
              Let’s say you want to have a code review or a design review,
              great. Maybe you want to share your experience with the latest
              JavaScript framework or seek some geek parenting advice. There are
              no limits, there are no artificial boundaries. Just people helping
              people be awesome.
            </p>

            <p class="mt-8">
              Nothing will ever replace having a face to face conversation. When
              we talk face to face it's much easier to engage in a deeper way
              where we can let the conversation and context navigate our
              conversation.
            </p>
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
