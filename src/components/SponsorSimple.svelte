<script>
  export let eventId = $currentEvent.eventId;

  import currentEvent from '../store/currentEvent';
  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';

  const GET_PARTNERS = `
    query getCurrentEvent($id: ID!) {
      events {
        event(findBy: { id: $id }) {
          get {
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
    }
  `;

  const PARTNER_LEVELS_TO_DISPLAY = ['CORPORATE_PARTNER', 'PARTNER'];

  function queryPartners() {
    return getClient()
      .query(GET_PARTNERS, { id: eventId })
      .toPromise()
      .then(p => {
        const { partners } = p.data.events.event.get;

        return partners.filter(partner =>
          PARTNER_LEVELS_TO_DISPLAY.includes(partner.level),
        );
      });
  }
</script>

{#await queryPartners() then partners}
  {#if partners.length > 0}
    <div class="relative bg-white overflow-hidden my-12">
      <div class="max-w-screen-xl mx-auto px-8">
        <div class="sm:text-center lg:text-center pb-12">
          <h2
            class="text-4xl tracking-tight leading-10 font-extrabold
              text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl py-4"
          >
            <span class="text-thatOrange-400">THANK YOU</span>
            for your support!
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          {#each partners as p}
            <div
              class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
            >
              <Link href="/partners/{p.slug}">
                <img class="h-12" src="{p.companyLogo}" alt="{p.companyName}" />
              </Link>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
{/await}
