<script>
  import archieml from 'archieml';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
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

<Layout>
  <div class="py-16 bg-white">
    <div class="relative">
      {#await getReleases then results}
        {#each results as release}
          <div class="mb-20">
            <ReleaseNote releaseNotes="{`_releaseNotes/${release}.aml`}" />
          </div>
        {/each}
      {/await}
    </div>
  </div>
</Layout>
