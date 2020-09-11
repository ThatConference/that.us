<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import archieml from 'archieml';
  import _ from 'lodash';

  import { Left, Right } from '../../elements/svgs';
  import SimpleLayout from '../../elements/layouts/Simple.svelte';
  import ReleaseNote from '../../components/releaseNotes/Release.svelte';
  import metaTagsStore from '../../store/metaTags';

  let getReleases = fetch('_releaseNotes/manifest.aml')
    .then(response => response.text())
    .then(r => {
      const { releases } = archieml.load(r);
      releases.reverse();
      return releases;
    });

  metaTagsStore.set({
    title: 'Changelog',
    description: 'Check out all of the releases.',
    openGraph: {
      type: 'website',
      url: `https://that.us/changelog`,
    },
  });
</script>

<SimpleLayout>
  <div class="relative py-16 bg-white">
    <div
      class="hidden lg:block lg:absolute lg:h-full lg:w-full overflow-x-hidden"
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

    {#await getReleases then results}
      {#each results as release}
        <div class="mb-20">
          <ReleaseNote releaseNotes="{`_releaseNotes/${release}.aml`}" />
        </div>
      {/each}
    {/await}
  </div>
</SimpleLayout>
