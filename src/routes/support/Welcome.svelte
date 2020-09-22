<script>
  import { Link } from 'yrv';

  import Layout from './_Layout.svelte';
  import Header from './_Header.svelte';
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
  <Header>Welcome to THAT!</Header>
  <section>
    <div
      class="relative text-base max-w-prose mx-auto mb-8 lg:max-w-5xl lg:mx-0
        lg:pr-72 text-lg text-gray-500 leading-7"
    >
      <p>
        Here at THAT, it's our mission to help foster the best community of
        geeks on this planet. We're grateful you're here and now we want to make
        sure you have the information you need to get involved with THAT.
      </p>

      <p class="mt-8">
        In short, anyone, at anytime can create what we call an activity. The
        format of an activity is simple, a video call in the browser, no tools
        required. Every activity has a chat window, you're able to share your
        desktop, your webcam and mic are enabled. Our goal is to create the best
        virtual face to face converation possible but give you the room to have
        any type of conversation you need.
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
              <Link href="/support/what-is-an-activity">
                <span class="text-thatBlue-500">What is an activity.</span>
              </Link>
            </li>
            <li>
              <Link href="/support/join-an-activity">
                <span class="text-thatBlue-500">Join an upcoming activity.</span>
              </Link>
            </li>
            <li>
              <Link href="/support/create-an-activity">
                <span class="text-thatBlue-500">Creating an activity.</span>
              </Link>
            </li>
            <li>
              <Link href="/support/staying-up-to-date">
                <span class="text-thatBlue-500">Staying up to date.</span>
              </Link>
            </li>
            <li>
              <Link href="/my/profile">
                <span class="text-thatBlue-500">Keep your profile up to date.</span>
              </Link>
            </li>
          </ul>

          <h2>Why THAT?</h2>

          <p>
            It’s our mission to connect you to others creating a safe place to
            have the conversations we should be having each and every day. Let’s
            say you want to have a code review or a design review, great. Maybe
            you want to share your experience with the latest JavaScript
            framework or seek some geek parenting advice. There are no limits,
            there are no artificial boundaries. Just people helping people be
            awesome.
          </p>

          <p class="mt-8">
            Nothing will ever replace having a face to face conversation. When
            we talk face to face it's much easier to engage in a deeper way
            where we can let the conversation and context navigate our
            conversation.
          </p>
        </div>
        <div class="flex space-x-4 text-base max-w-prose mx-auto lg:max-w-none">
          <StandardLink href="/activities">Upcoming Activities</StandardLink>
          <HighlightLink href="/support/what-is-an-activity">
            What is an Activity?
          </HighlightLink>
        </div>
      </div>
      <div class="relative text-base max-w-prose mx-auto lg:max-w-none">
        <WelcomeQuote />
      </div>
    </div>
  </section>
</Layout>
