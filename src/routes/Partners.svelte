<script>
  export let router;

  import { onMount } from 'svelte';
  import { getClient } from '@urql/svelte';

  import _ from 'lodash';

  import { Waiting } from '../elements';
  import Hero from '../components/partners/Hero.svelte';
  import Footer from '../components/Footer.svelte';
  import PartnerCard from '../components/partners/PartnerCard.svelte';
  import CardLoader from '../components/CardLoader.svelte';

  import partnersApi from '../dataSources/api.that.tech/partners';

  const { get } = partnersApi(getClient());

  let partners = get();
</script>

<main>
  <Hero />
  <div class="relative bg-white overflow-hidden py-12">
    <div class="max-w-screen-xl mx-auto px-8">
      {#await partners}
        <CardLoader />
      {:then partners}
        <ul
          class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-5"
        >
          {#each partners as p (p.id)}
            <li
              class="col-span-1 flex flex-col text-center bg-white rounded-lg
              shadow"
            >
              <PartnerCard {...p} />
            </li>
          {/each}
        </ul>
      {/await}
    </div>
  </div>
  <Footer />
</main>
