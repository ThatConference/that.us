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
    title: 'Getting Started - THAT',
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
        geeks on this planet. Our vision, create an interactive platform
        connecting Geeks and Geeklings across the globe in such a way they can
        help one another whenever and wherever regardless of topic or format.
      </p>

      <p class="mt-8">
        We created THAT to fill a gap between the times when we cannot
        physically connect. We believe peer to peer learning is one of the most
        powerful ways we can help one another any day of the year.
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
          <h2>The What</h2>

          <p>
            Let’s say you want to have a code review or a design review, great.
            Maybe you want to share your experience with the latest JavaScript
            framework or seek some geek parenting advice. There are no limits,
            there are no artificial boundaries. Just people helping people be
            awesome.
          </p>

          <p class="mt-8">
            In short, anyone, at anytime can create what we call an Activity.
            The format of an Activity is simple, a video call in the browser, no
            tools required. Every Activity has a chat window, you're able to
            share your desktop, your webcam and mic is enabled. Our goal is to
            create the best virtual face to face conversation possible but give
            you the room to have any type of conversation you need. We're
            grateful you're here and now we want to make sure you have the
            information you need to get involved with THAT.
          </p>

          <p>Things we you should know:</p>
          <ul>
            <li>
              <Link href="/support/what-is-an-activity">
                What is an Activity?
              </Link>
            </li>
            <li>
              <Link href="/support/joining-an-activity">
                How to join an Activity.
              </Link>
            </li>
            <li>
              <Link href="/support/creating-an-activity">
                How to create an Activity.
              </Link>
            </li>
            <li>
              <Link href="/support/staying-up-to-date">
                How to stay up to date.
              </Link>
            </li>
            <li>
              <Link href="/my/profile">Keep your profile up to date.</Link>
            </li>
          </ul>
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
