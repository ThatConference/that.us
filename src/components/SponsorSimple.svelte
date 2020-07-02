<script>
  import { initClient } from '@urql/svelte';

  const client = initClient({ url: 'https://api.that.tech' });

  const GET_PARTNERS = `
      query getEvent($slug: String!) {
        events {
          eventBySlug(slug: $slug) {
            partners {
              level
              companyName
              companyLogo
            }
          }
        }
      }
    `;

  const PARTNER_LEVELS_TO_DISPLAY = ['CORPORATE_PARTNER', 'PARTNER'];

  function queryPartners() {
    return client
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
  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">

        {#each partners as p}
          <div
            class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
          >
            <img class="h-12" src="{p.companyLogo}" alt="{p.companyName}" />
          </div>
        {/each}

      </div>
    </div>
  </div>
{/await}
