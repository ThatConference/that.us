<script>
  export let router;

  import { Link } from 'yrv';

  import metaTagsStore from '../../store/metaTags';
  import ProfileLayout from '../../elements/layouts/Profile.svelte';
  import Header from '../../elements/layouts/profile/_Header.svelte';

  import NewestFollowers from './_NewestFollowers.svelte';

  import { Standard as StandardButton } from '../../elements/buttons';

  metaTagsStore.set({
    title: 'Community - THAT',
    description: '',
    openGraph: {
      type: 'website',
      url: `https://that.us/communities/`,
    },
  });

  const { community } = router.params;
</script>

<ProfileLayout>
  <div class="flex flex-col space-y-12">
    <section class="lg:grid lg:grid-cols-12 lg:gap-8">
      <div
        class="text-center md:max-w-2xl md:mx-auto lg:col-span-3
            lg:text-left"
      >
        <img
          class="h-60 w-60"
          src="/images/logos/logo-nodejs.svg"
          alt="javascript logo"
        />
      </div>
      <div class="lg:col-start-4 lg:col-span-9">
        <div class="flex items-center justify-between">
          <div>
            <Header subtitle="Community Spotlight">Node.js</Header>
          </div>

          <div>
            <StandardButton class="h-3/4" on:click="{console.log('clicked')}">
              Follow
            </StandardButton>
          </div>
        </div>

        <p>
          Bacon ipsum dolor amet ground round meatball ham hock ribeye strip
          steak bacon tenderloin pig beef ribs meatloaf jerky chuck porchetta
          corned beef boudin. Pork chop shank tail, salami sausage ham hock
          swine. Frankfurter sirloin prosciutto cow tongue tail fatback pork
          hamburger pancetta t-bone. Picanha pig turducken doner hamburger flank
          ham hock beef ribs sausage prosciutto jerky ground round. Tenderloin
          pork chop landjaeger ball tip swine.
        </p>
      </div>
    </section>

    <NewestFollowers />
    <section>activities</section>
    <section>events</section>
  </div>
</ProfileLayout>
