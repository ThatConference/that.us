<script>
  import { onMount, getContext } from 'svelte';
  import { Link, router } from 'yrv';

  import Layout from './components/_Layout.svelte';
  import metaTagsStore from '../../store/metaTags';
  import {
    Highlight as HighlightLink,
    Standard as StandardLink,
  } from '../../elements/links';

  import { thatProfile } from '../../utilities/security';
  import QuestionModal from './components/_QuestionModal.svelte';

  const { send } = getContext('cart');

  // todo. not sure if this route will work with the additional script
  let formDataPrefill;
  onMount(() => {
    send('CLEAR_CART');
    const [_, queryString] = window.location.search.split('?');

    formDataPrefill = `memberId=${$thatProfile.id}&memberEmail=${$thatProfile.email}&firstName=${$thatProfile.firstName}&lastName=${$thatProfile.lastName}&${queryString}`;
  });

  metaTagsStore.set({
    title: 'Payment Recieved - THAT',
    description: 'Your payment was successfully received.',
    nofollow: true,
    noindex: true,
    openGraph: {
      type: 'website',
      url: `https://that.us/orders/success`,
    },
  });

  let questionsCompleted = false;

  function handleOnSubmit(e) {
    //todo post to the api that this was completed.
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
  <div class="">
    <div
      class="z-50 absolute inset-0 min-h-screen min-w-screen bg-gray-500 opacity-75">
    </div>
    <QuestionModal>
      <div
        class="h-full w-full"
        data-prefill="{formDataPrefill}"
        data-paperform-id="tzytilxo">
      </div>
    </QuestionModal>
  </div>
{/if}

<Layout>
  <div class="space-y-12">
    <div class="text-base max-w-prose mx-auto lg:max-w-none">
      <h2
        class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase">
        Payment Recieved
      </h2>
      <p
        class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900">
        Thank You
      </p>
    </div>

    <div class="relative">
      <div class="prose text-lg text-gray-500 mx-auto lg:max-w-none">
        <p>
          Our passion is people, communities, and helping one another become a
          better geek than they were yesterday. We couldn't do this without you
          and your support. <span class="font-bold">Thank You!</span>
        </p>

        <p>So now what?</p>

        <ul>
          <li>
            Join in! Better yet, go create an activity. <Link
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

        <h3>Order Confirmation and Receipt</h3>
        <p>
          If you've landed here, that means all of the crazy squirrels in the
          clouds did their jobs. In your inbox, you should see two confirmation
          emails, a receipt from the credit card processor, and a welcome
          message from THAT. <span class="font-bold">
            If you're not seeing those, please check your junk/spam folders as
            sometimes we manage to land there accidentally.</span>
        </p>
        <div class="mt-12 flex justify-end space-x-5">
          <StandardLink href="/my/settings/order-history">
            View Your Order History
          </StandardLink>

          <HighlightLink href="/activities">
            Check out the upcoming Activities
          </HighlightLink>
        </div>
      </div>
    </div>
  </div>
</Layout>
