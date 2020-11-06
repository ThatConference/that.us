<script>
  export let releaseNotes;

  import archieml from 'archieml';
  import Icon from 'svelte-awesome';
  import { externalLink } from 'svelte-awesome/icons';

  import { StandardLink } from '../../elements';

  const getRelease = fetch(releaseNotes)
    .then(response => response.text())
    .then(r => archieml.load(r));
</script>

{#await getRelease then release}
  <div class="relative px-4 sm:px-6 lg:px-8">
    <div class="text-lg max-w-prose mx-auto mb-6">
      <p
        class="text-base text-center leading-6 text-indigo-600 font-semibold
          tracking-wide uppercase"
      >
        {release.versionNumber}
      </p>
      <h1
        class="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold
          tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        {release.date}
      </h1>
      <p class="text-xl text-gray-500 leading-8">{release.notes}</p>
    </div>
    <div class="max-w-prose mx-auto">
      <h1
        class="mt-2 mb-8 text-3xl sm:text-lg leading-8 font-extrabold
          tracking-tight text-gray-900"
      >
        Major items included:
      </h1>
      <div class="mx-auto">
        <ul>
          {#each release.features as f, i (i)}
            <li>
              <div
                class="flex space-x-3 items-center hover:text-that-blue
                  cursor-pointer pb-2"
              >
                <div>
                  <Icon data="{externalLink}" class="h-4 w-4" />
                </div>
                <div>
                  <StandardLink href="{f.url}">{f.feature}</StandardLink>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
{/await}
