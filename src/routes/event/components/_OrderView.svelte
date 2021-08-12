<script>
  export let registrations = [];

  import Fuse from 'fuse.js'; // https://fusejs.io/api/options.html
  import { sortBy } from 'lodash';

  import Order from './_Order.svelte';

  const searchOptions = {
    isCaseSensitive: false,
    // includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    findAllMatches: true,
    minMatchCharLength: 3,
    // location: 0,
    threshold: 0.2,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    keys: [
      'member.firstName',
      'member.lastName',
      'member.email',
      'orderAllocations.allocatedTo.firstName',
      'orderAllocations.allocatedTo.lastName',
      'orderAllocations.allocatedTo.email',
      'orderAllocations.purchasedBy.firstName',
      'orderAllocations.purchasedBy.lastName',
      'orderAllocations.purchasedBy.email',
    ],
  };

  let registrationsViewPrefs = registrations;

  let registrationsFiltered = [];
  let searchterm = '';

  $: if (searchterm === '') {
    registrationsFiltered = registrations;
  } else {
    registrationsFiltered = fuse.search(searchterm).map(r => r.item);
  }

  $: fuse = new Fuse(registrations, searchOptions);
</script>

<section>
  <div>
    <div class="flex space-x-8 items-center">
      <input
        autofocus
        class="form-input border rounded-md hidden sm:inline"
        bind:value="{searchterm}"
        placeholder="type to search..." />

      <slot name="toggle" />
    </div>

    <div class="mt-12">
      <ul class="space-y-4">
        {#each registrationsFiltered as reg (reg.id)}
          <li
            class="bg-gray-50 bg-opacity-75 shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md">
            <Order registration="{reg}" />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
