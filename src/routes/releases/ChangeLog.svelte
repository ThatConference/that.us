<script>
  import { onMount } from 'svelte';
  import archieml from 'archieml';
  import _ from 'lodash';
  import { FacebookLoader } from 'svelte-content-loader';

  import ReleaseNote from '../../components/releaseNotes/Release.svelte';

  let getReleases = fetch('_releaseNotes/manifest.aml')
    .then(response => response.text())
    .then(r => {
      const { releases } = archieml.load(r);
      releases.reverse();
      return releases;
    });
</script>

<section>
  {#await getReleases}
    <FacebookLoader uniqueKey="card" />
  {:then results}
    {#each results as release}
      <ReleaseNote releaseNotes="{`_releaseNotes/${release}.aml`}" />
    {/each}
  {/await}
</section>
