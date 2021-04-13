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
    title: 'Covid Policies - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/support/covid`,
    },
  });
</script>

<Layout>
  <Header>Covid Policies</Header>
  <section>
    <div
      class="relative max-w-prose mx-auto mb-8 lg:max-w-5xl lg:mx-0 lg:pr-72 text-lg text-gray-500 leading-7">
      <p>opening stuff</p>
    </div>
    <div
      class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start text-lg text-gray-500 leading-7">
      <div class="relative mb-12 lg:mb-0">
        <div
          class="mb-10 prose mx-auto lg:max-w-none text-lg text-gray-500 leading-7">
          <h2>The What</h2>

          <p>stuff</p>

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
              <Link href="/my/settings/profile"
                >Keep your profile up to date.</Link>
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
    </div>
  </section>
</Layout>
