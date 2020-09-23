<script>
  import { Link } from 'yrv';

  import Layout from './_Layout.svelte';
  import Header from './_Header.svelte';

  import {
    Highlight as HighlightLink,
    Standard as StandardLink,
  } from '../../elements/links';
  import { Standard as StandardButton } from '../../elements/buttons';

  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'Staying Up To Date - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/support/join-activity`,
    },
  });

  let copyText = 'https://bit.ly/2YRdVxy';
  function copyToClipboard() {
    let calendarElement = document.getElementById('calendarUrl');
    let range = document.createRange();
    range.selectNode(calendarElement);
    window.getSelection().addRange(range);

    try {
      document.execCommand('copy');
      copyText = 'Copied to Clipboard';
    } catch (err) {
      console.error('Oops, unable to copy');
    }

    window.getSelection().removeAllRanges();
  }
</script>

<Layout>
  <Header center="{true}">Staying Up To Date</Header>
  <section>
    <div class="prose prose-lg text-gray-500 mx-auto">
      <p>
        Life moves fast and you have enough to sift through already. Our goal is
        to make it very easy to stay up to date with everything THAT, while not
        becoming refrigerator noise. To that end, we currently have three
        different ways you can stay up to date.
      </p>

      <ul>
        <li>The Activity Board & My Favorites.</li>
        <li>Subsribe to our shared calendar.</li>
        <li>#that_board in Slack.</li>
      </ul>

      <h2>Activity Board and My Favorties</h2>
      <p>
        <Link href="/activities">The Activity Board</Link>
        as we call it, is your main place to find out what's up next. It will
        always show all Activities from today looking forward. You can also find <strong
          class="italic"
        >all</strong> Activities
        <Link href="/events/thatUs">here</Link>.
      </p>

      <p>
        <Link href="/my/favorites">My Favorites</Link>
        is just like the Activity Board but filtered to the Activities you've
        already favortied. This is great during times of high usage or for
        historical reasons.
      </p>

      <h2>Calendar Feed</h2>
      <p>
        Most people live by their calendars. We've created a shared Google
        calender that you can subscribe too. This calendar is updated as
        Activities are created and updated and every entry reflects the all of
        the same information you would find on the Activity details page. The
        link below will copy to your clipboard for you to use in your favorite
        calednar program.
      </p>

      <div class="transform scale-75 text-center">
        <a
          on:click|preventDefault="{copyToClipboard}"
          href="https://bit.ly/2YRdVxy"
          id="calendarUrl"
        >{copyText}</a>
      </div>

      <h2>#that_board in THAT Slack</h2>
      <p>
        Of course we wouldn't forget our very active Slack Channel. There is a
        dedicated channel in our Slack (#that_board) which not only recieves
        realtime updates when the Activities are created but it will also send
        out a daily and hourly digest when an Activity is scheduled. If you're
        not in our Slack, join us today!
      </p>

      <div class="text-center my-12">
        <StandardLink open="{true}" href="https://thatslack.thatconference.com">
          Join us in THAT Slack
        </StandardLink>
      </div>

      <p>
        Over time we will continue to extend THAT in new and interesting ways.
        It's our goal to connect you to the relavent topics, and help you grow
        your network accordinally based on your interests.
      </p>
    </div>
    <div
      class="my-12 max-w-prose mx-auto lg:max-w-none flex flex-col items-center
        justify-center"
    >
      <div class="flex space-x-4 text-base">
        <StandardLink href="/support/creating-an-activity">
          Create an Activity
        </StandardLink>
        <HighlightLink href="/activities">
          Check out the upcoming Activities
        </HighlightLink>
      </div>
    </div>
  </section>
</Layout>
