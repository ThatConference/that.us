<script>
  import { getClient } from '@urql/svelte';

  const GET_PARTNERS = `
      query getEvent($slug: String!) {
        events {
          eventBySlug(slug: $slug) {
            partners {
              id
              level
              companyName
              companyLogo
              slug
            }
          }
        }
      }
    `;

  const PARTNER_LEVELS_TO_DISPLAY = ['CORPORATE_PARTNER', 'PARTNER'];

  function queryPartners() {
    return getClient()
      .query(GET_PARTNERS, { slug: 'wi/2020' })
      .toPromise()
      .then(p => {
        const partners = p.data.events.eventBySlug.partners;

        return partners.filter(partner =>
          PARTNER_LEVELS_TO_DISPLAY.includes(partner.level),
        );
      });
  }
</script>

{#await queryPartners() then partners}
  <div class="relative bg-white overflow-hidden my-12">
    <div class="max-w-screen-xl mx-auto px-8">
      <div class="sm:text-center lg:text-center pb-12">
        <h2
          class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900
          sm:text-5xl sm:leading-none md:text-6xl py-4"
        >
          <span class="text-indigo-600">THANK YOU</span>
          for your support!
        </h2>
      </div>

      <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
        {#each partners as p}
          <div
            class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
          >
            <a href="https://www.thatconference.com/partner/{p.slug}">
              <img class="h-12" src="{p.companyLogo}" alt="{p.companyName}" />
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/await}
