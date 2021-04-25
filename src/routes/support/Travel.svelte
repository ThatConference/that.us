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
  <Header pretext="THAT Campsite">Travel and Lodging Information</Header>
  <section class="text-gray-500">
    <div
      class="relative 
              text-lg text-gray-500 leading-7 prose-lg
              max-w-prose lg:max-w-5xl  
              mx-auto lg:mx-0 mb-8 lg:pr-72  ">
      <p>
        We have partnered with the Kalahari Resort to offer the best group rates
        around the height of the summer vacation season. Our 2021 THAT
        Conference room block opens <span class="font-semibold text-gray-800"
          >April 26th, 2021</span>
        , and will close
        <span class="font-semibold text-gray-800">June 23rd, 2021</span> or until
        the block is filled so reserve your room early!
      </p>

      <p class="mt-8">
        Discounted rates are available not only during our conference dates, but
        also a few days before and after the event in case you'd like to extend
        your stay.
      </p>
    </div>

    <div
      class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start text-lg  leading-7">
      <div class="relative mb-12 lg:mb-0">
        <div class="mb-10 flex flex-col justify-start">
          <div class="mb-10 prose prose-lg text-gray-500">
            <h2>Booking a Reservation</h2>

            <p>
              A dedicated website is now available for you to book your hotel
              room online.
            </p>

            <div class="flex flex-col">
              <StandardLink
                open="{true}"
                href="https://book.passkey.com/e/50185885"
                >Book Today</StandardLink>
            </div>
          </div>

          <div class="mb-10 prose prose-lg text-gray-500">
            <h2>THAT Campsite</h2>

            <p>The Kalahari Resort and Convention Center can be located at:</p>

            <blockquote>
              Kalahari Resorts and Convention Center<br />
              1305 Kalahari Drive<br />
              Wisconsin Dells, WI 53965<br />
            </blockquote>
          </div>

          <div class="prose prose-lg text-gray-500">
            <h2>From The Air</h2>

            <p>
              If you're coming from afar and need to fly there are three major
              airports to choose from.
            </p>

            <ul>
              <li>
                Madison Dane County Regional (MSN) is the closest airport at 50
                minutes away from the Kalahari.
              </li>
              <li>
                Milwaukee Mitchell (MKE) is 1:51 hours away from the Kahalari.
              </li>
              <li>
                Chicago O'Hare (ORD) is the farthest away at 2:45 hrs from the
                Kalahari but it's all highway driving.
              </li>
            </ul>

            <p>
              Should I fly to MKE and take a puddle-jumper over to MSN? We don't
              recommend it as it might take you longer to deal with the layover
              rather than jumping in a car and driving to the Kalahari.
            </p>
            <p>
              Are there shuttles to the Kalahari from the airports?
              Unfortunately no but we suggest jumping in THAT Slack and ask if
              anyone is interested in ridesharing.
            </p>
          </div>
        </div>
      </div>
      <div class="relative text-base max-w-prose mx-auto lg:max-w-none">
        <MemoryHighlight imageSrc="/images/memories/hallway2_small.jpg" />
      </div>
    </div>
  </section>
</Layout>
