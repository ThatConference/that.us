<script>
  import { Link } from 'yrv';

  import Layout from './_Layout.svelte';
  import Header from './_Header.svelte';
  import MemoryHighlight from './_MemoryHighlight.svelte';

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
  <Header center="true" pretext="THAT Campsite">COVID Policies</Header>
  <section class="max-w-prose mx-auto text-gray-500 ">
    <div class="mb-12 relative text-gray-500 prose-lg">
      <p>
        While THAT Conference 2021 will be held as a digital-first platform, we
        are committed to the health and safety of all in-person participants of
        the conference. We are constantly monitoring the CDC guidelines and
        working with the Kalahari Meeting and Convention team to accommodate
        healthy practices in the convention center. While there are risks
        associated with attending an event during a pandemic, the following
        procedures have been created to minimize those risks. We continue to
        update this page as needed based on federal, state, and local mandates
        and recommendations.
      </p>
    </div>

    <div class="relative mb-12 lg:mb-0 max-w-prose mx-auto">
      <div class="mb-10 flex flex-col justify-start space-y-10">
        <div class="prose prose-lg text-gray-500">
          <h2>What we are doing.</h2>
          <ul>
            <li>
              THAT Conference will be the only group to occupy the 212,000 sq ft
              convention center space allowing us to follow social distancing
              guidelines.
            </li>
            <li>
              We will operate at a reduced capacity in the convention center.
              Tables in common spaces and seating in session rooms will be
              spaced appropriately to ensure social distancing.
            </li>
            <li>
              We will operate at a reduced capacity in the convention center.
              Tables in common spaces and seating in session rooms will be
              spaced appropriately to ensure social distancing.
            </li>
            <li>
              A meeting room enter/exit strategy will exist to reduce the flow
              of people in the hallways.
            </li>
            <li>
              A meeting room enter/exit strategy will exist to reduce the flow
              of people in the hallways.
            </li>
            <li>
              High touchpoint areas will be reduced as much as possible and
              sanitation will occur between use.
            </li>
            <li>
              All used meeting rooms will be fumigated at the end of each night.
            </li>
          </ul>
        </div>

        <div class="prose prose-lg text-gray-500">
          <h2>What the Kalahari is doing.</h2>
          <p>
            The Kalahari has implemented several wellness initiatives throughout
            the resort and convention center. Click here for more information
            <a
              href="https://www.kalahariresorts.com/what-we-are-doing-to-ensure-a-safe-getaway/">
              https://www.kalahariresorts.com/what-we-are-doing-to-ensure-a-safe-getaway/
            </a>
          </p>
        </div>

        <div class="prose prose-lg text-gray-500">
          <h2>Our Recommendations</h2>
          <ul>
            <li>
              The Kalahari has implemented several wellness initiatives
              throughout the resort and convention center. Click here for more
              information
              [https://www.kalahariresorts.com/what-we-are-doing-to-ensure-a-safe-getaway/](https://www.kalahariresorts.com/what-we-are-doing-to-ensure-a-safe-getaway/)
            </li>
            <li>Use no touch gestures as a way of greeting individuals.</li>
            <li>
              If you have any medical condition that could be aggravated by
              COVID we ask that you do not attend in person.
            </li>
            <li>Wash your hands frequently.</li>
            <li>
              Please consider public health guidelines when gathering outside of
              the convention center.
            </li>
            <li>Stay at home if you are not feeling well.</li>
            <li>
              Stay in your room if you are attending in-person and are not
              feeling well.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</Layout>
