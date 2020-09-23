<script>
  import { Link } from 'yrv';

  import Layout from './_Layout.svelte';
  import Header from './_Header.svelte';

  import {
    Highlight as HighlightLink,
    Standard as StandardLink,
  } from '../../elements/links';

  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Creating an Activity - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/support/join-activity`,
    },
  });
</script>

<Layout>
  <Header center="{true}">Creating an Activity</Header>
  <section>
    <div class="prose prose-lg text-gray-500 mx-auto">
      <p>
        It's THAT time! You're now ready to create your first Activity. We're
        couldn't be more excited and want to make sure you get started off
        right. Honestly it's very simple and if late you found you made a
        mistake or want to adjust you can easily do so at anytime.
      </p>

      <div class="transform scale-75 text-center">
        <StandardLink href="/activities/create">
          Create an Activity
        </StandardLink>
      </div>

      <p>
        To create an Activity you first need to
        <Link href="/login">login</Link>
        if you're not already. If you still need an account just
        <Link href="/login?signup=true">create one here</Link>, and then update
        your
        <Link href="/my/profile">profile accordinally</Link>. Once completed you
        can now create an
        <Link href="/activity/create">New Activity</Link>. It's here where you
        will detail out the conversation, inviting others to join in. The
        submission process isn't complex but it's important as you want to make
        sure the right people join in your Activiy.
      </p>

      <ul>
        <li>
          <strong class="italic">Title: </strong>A brief opener of what this
          Activity is all about.
        </li>
        <li>
          <strong class="italic">Description: </strong>Here you explain a bit
          more about the potential conversation you're wishing to have. If
          you're seeking help from others explain what help you think you need
          so others who might have the answer know if they're able to help.
        </li>
        <li>
          <strong class="italic">Tags: </strong>You have a limit of 5 tags.
          These are attributes about this conversation and they help with things
          like people searching.
        </li>
        <li>
          <strong class="italic">Date and Starting Time: </strong>When are we
          starting. Mind you people from all over the world are joining and you
          can pick anytime throughout the day as to best overlap with different
          timezones.
        </li>
        <li>
          <strong class="italic">Estimated Duration: </strong>Your Activity can
          go as long as it needs too but people also need to plan their day's
          and night's.
        </li>
      </ul>

      <div class="text-center my-12">
        <figure>
          <img
            class="w-full rounded-lg shadow"
            src="/images/ActivityCreateExample.jpg"
            alt="New Activity Form"
          />
          <figcaption>New Activity Form</figcaption>
        </figure>
      </div>

      <p>
        If you'd like to browse through some of our past Activities you will
        find them
        <Link href="/events/thatUs">here</Link>. Once you've submitted your
        Activity you'll recieve an email confirmation which will also include a
        calendar attachment.
      </p>

      <h2>Need to Update your Activity?</h2>
      <p>
        We all make mistakes or maybe you just want to tweak things a bit
        further. No problem. You can find all of you submitted Activities
        <Link href="/my/submissions">here</Link>, we call it <span
          class="italic"
        >My Submissions</span> and you will alway find it under your profile picture.
        Now pick the correct Activity and then select edit.
      </p>
    </div>
    <div
      class="my-12 max-w-prose mx-auto lg:max-w-none flex flex-col items-center
        justify-center"
    >
      <div class="flex space-x-4 text-base">
        <StandardLink href="/support/joining-an-activity">
          Joining an Activity
        </StandardLink>
        <HighlightLink href="/support/staying-up-to-date">
          Staying Up To Date
        </HighlightLink>
      </div>
    </div>
  </section>
</Layout>
