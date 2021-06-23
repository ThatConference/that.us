<script>
  import { onMount } from 'svelte';
  import { Link } from 'yrv';

  import Layout from './components/_Layout.svelte';
  import metaTagsStore from '../../store/metaTags';
  import {
    Highlight as HighlightLink,
    Standard as StandardLink,
  } from '../../elements/links';

  import { thatProfile } from '../../utilities/security';
  import QuestionModal from './components/_QuestionModal.svelte';

  $: questionsCompleted = false;
  let formDataPrefill;

  onMount(() => {
    const [_, queryString] = window.location.search.split('?');
    formDataPrefill = `memberId=${$thatProfile.id}&memberEmail=${$thatProfile.email}&firstName=${$thatProfile.firstName}&lastName=${$thatProfile.lastName}&${queryString}`;
  });

  metaTagsStore.set({
    title: 'Speaker Acceptance - THAT',
    description: 'W.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/speakers/accept`,
    },
  });

  function handleOnSubmit(e) {
    questionsCompleted = true;
  }

  function handleOnLoad() {
    window.addEventListener('PaperformSubmission', handleOnSubmit);
  }
</script>

<svelte:head>
  <script src="https://paperform.co/__embed.min.js" on:load="{handleOnLoad}">
  </script>
</svelte:head>

{#if !questionsCompleted}
  <div class="overscroll-none">
    <div
      class="z-50 fixed inset-0 min-h-screen min-w-screen bg-gray-500 opacity-75">
    </div>
    <QuestionModal>
      <div
        class="h-full w-full"
        data-prefill="{formDataPrefill}"
        data-paperform-id="yr2byvxg">
      </div>
    </QuestionModal>
  </div>
{/if}

<Layout>
  <div class="space-y-12">
    <div class="text-base max-w-prose mx-auto lg:max-w-none">
      <h2
        class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase">
        Counselor Acceptance
      </h2>
      <p
        class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900">
        Congratulations are in order!
      </p>
    </div>

    <div class="relative">
      <div class="prose text-lg text-gray-500 mx-auto lg:max-w-none">
        <p>
          Our passion is people, communities, and helping one another become a
          better geek than they were yesterday. We honored to have you join us.
          <span class="font-bold">Thank You!</span>
        </p>

        <p>What's next?</p>

        <ul>
          <li>If you're speaking in-person, reserve your room ASAP.</li>
          <li>
            <Link href="my/settings/profile"
              >Review and update your profile.</Link>
          </li>

          <li>
            If you've requested some help in preparing, an email will be
            arriving soon with more details.
          </li>

          <li>
            We will send you a link to a few slides to include in your
            presentation, thanking our sponsors.
          </li>

          <li>
            Join in now! Better yet, go create an activity. <Link
              href="/support/welcome">Learn how to get started.</Link>
          </li>
          <li>
            <Link href="https://thatslack.thatconference.com"
              >Join us in Slack.</Link>
          </li>
          <li>
            Keep up to date. <Link href="/support/staying-up-to-date"
              >Subscribe to the calendar.</Link>
          </li>
          <li>
            Get ready for what's coming. <Link href="/events"
              >Check out our past and upcoming events.</Link>
          </li>
        </ul>

        <div class="mt-12 flex justify-end space-x-5">
          <StandardLink href="/my/submissions">View Your Sessions</StandardLink>

          <HighlightLink href="/activities">
            Check out the upcoming Activities
          </HighlightLink>
        </div>
      </div>
    </div>
  </div>
</Layout>
