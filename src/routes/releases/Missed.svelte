<script>
  import { onMount } from 'svelte';
  import archieml from 'archieml';
  import _ from 'lodash';

  import ReleaseNote from '../components/releaseNotes/Release.svelte';

  let missedReleases = [];

  onMount(async () => {
    let versionLastSeen = window.localStorage.getItem('versionLastSeen');

    let aml = await fetch('_releaseNotes/manifest.aml').then(response =>
      response.text(),
    );
    let { releases } = archieml.load(aml);

    if (versionLastSeen) {
      missedReleases = releases.slice(releases.indexOf(versionLastSeen) + 1);
    } else {
      missedReleases = releases;
    }

    // show based on newest release first.
    missedReleases.reverse();

    window.localStorage.setItem('versionLastSeen', _.last(releases));
  });
</script>

<div>
  {#each missedReleases as release}
    <ReleaseNote releaseNotes="{`_releaseNotes/${release}.aml`}" />
  {/each}
</div>
