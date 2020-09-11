<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import archieml from 'archieml';
  import _ from 'lodash';
  import { Link } from 'yrv';

  import { Left, Right } from '../../elements/svgs';
  import SimpleLayout from '../../elements/layouts/Simple.svelte';
  import ReleaseNote from '../../components/releaseNotes/Release.svelte';
  import metaTagsStore from '../../store/metaTags';
  import { showReleaseNotes } from '../../store/siteVersion';

  let versionLastSeen;

  let getReleases = fetch('_releaseNotes/manifest.aml')
    .then(response => response.text())
    .then(r => {
      const { releases } = archieml.load(r);

      let missedReleases = [];
      if (versionLastSeen) {
        missedReleases = releases.slice(releases.indexOf(versionLastSeen) + 1);
      } else {
        missedReleases = releases;
      }

      // has to be before we reverse it.
      if (missedReleases.length > 0)
        window.localStorage.setItem('versionLastSeen', _.last(missedReleases));

      missedReleases.reverse();
      showReleaseNotes.set(false);
      return missedReleases;
    });

  onMount(async () => {
    versionLastSeen = window.localStorage.getItem('versionLastSeen');
  });

  metaTagsStore.set({
    title: 'Changelog',
    description: "This is what you've missed since your last visit.",
    openGraph: {
      type: 'website',
      url: `https://that.us/changelog-missed`,
    },
  });
</script>

<SimpleLayout>
  <div class="relative py-12 lg:py-16">
    <div class="text-left mb-12">
      <h3
        class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900
          sm:text-4xl sm:leading-10"
      >
        Since your last visit...
      </h3>
      <div>
        <Link href="/changelog" class="pointer hover:text-thatBlue-500">
          Checkout our past releases.
        </Link>
      </div>
    </div>

    {#await getReleases then results}
      {#if results.length > 0}
        <div
          class="hidden lg:block lg:absolute lg:h-full lg:w-full
            overflow-x-hidden overflow-y-hidden"
        >
          <div class="relative h-full text-lg max-w-prose mx-auto">
            <div in:fade="{{ duration: 2000 }}">
              <Left />
            </div>

            <div in:fade="{{ duration: 4000 }}">
              <Right />
            </div>
          </div>
        </div>

        {#each results as release}
          <div class="mb-20">
            <ReleaseNote releaseNotes="{`_releaseNotes/${release}.aml`}" />
          </div>
        {/each}
      {:else}
        <div>
          <p>You're all caught up!</p>
        </div>
      {/if}
    {/await}
  </div>
</SimpleLayout>
