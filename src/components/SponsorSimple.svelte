<script>
  export let eventId = $currentEvent.eventId;

  import currentEvent from '../store/currentEvent';
  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';
  import { get_slot_changes } from 'svelte/internal';

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

  const PARTNER_LEVELS_TO_DISPLAY = ['CORPORATE_PARTNER', 'PARTNER', 'PIONEER'];

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
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <slot name="header" />
        {#if !$$slots.header}
          <div class="text-center sm:text-left  pb-12">
            <h2
              class="py-4 text-4xl font-extrabold sm:text-5xl sm:tracking-tight  text-thatBlue-800">
              Thank You for your support!
            </h2>
          </div>
        {/if}

        <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          {#each partners as p}
            <div
              class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <div
                class="transition duration-500 ease-in-out transform hover:scale-105">
                <Link href="/partners/{p.slug}">
                  <img
                    class="h-12"
                    src="{p.companyLogo}"
                    alt="{p.companyName}" />
                </Link>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
{/await}
