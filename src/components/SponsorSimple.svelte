<script>
  export let eventId = $currentEvent.eventId;

  import { getClient } from '@urql/svelte';
  import { Link } from 'yrv';

  import currentEvent from '../store/currentEvent';
  import { Standard as StandardLink } from '../elements/links';

  const GET_PARTNERS = `
    query getCurrentEvent($id: ID!) {
      events {
        event(findBy: { id: $id }) {
          get {
            slug
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
        const results = p.data.events.event.get;

        return {
          slug: results.slug,
          partners: results.partners.filter(partner =>
            PARTNER_LEVELS_TO_DISPLAY.includes(partner.level),
          ),
        };
      });
  }
</script>

{#await queryPartners() then { slug, partners }}
  {#if partners.length > 0}
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div class="flex flex-col sm:grid grid-cols-6 gap-8">
          <div class="col-span-2 flex flex-col items-center p-8">
            <img
              class="w-1/2 sm:w-full"
              src="/images/characters/octopus_with_flag.png"
              alt="OctoPartner"
              loading="lazy" />
          </div>

          <div class="col-span-4">
            <div class="flex flex-col space-y-8">
              <h1
                class="text-center sm:text-left font-extrabold uppercase text-gray-500 text-2xl sm:text-3xl lg:text-4xl">
                Our Featured Camp Partners
              </h1>

              <div class="flex flex-wrap items-center justify-center">
                {#each partners as p}
                  <div
                    class="p-4 w-1/3 transition duration-500 ease-in-out transform hover:scale-105">
                    <Link href="/partners/{p.slug}">
                      <img
                        class="w-full h-24"
                        src="{p.companyLogo}"
                        alt="{p.companyName}"
                        loading="lazy" />
                    </Link>
                  </div>
                {/each}
              </div>

              <div class="flex space-x-4">
                <div class="py-4">
                  <h2 class="py-6 font-bold uppercase text-gray-500 text-2xl">
                    Interested In Partnership Opportunities?
                  </h2>
                  <p class="prose text-gray-500 text-xl">
                    We partner with industry-leading organizations and companies
                    that are looking to connect with software developers and
                    practitioners.
                  </p>
                </div>
              </div>

              <div class="justify-center sm:justify-end flex space-x-4">
                <div
                  class="px-8 py-3 border-2 border-transparent leading-6 font-medium rounded-md
                    shadow md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out
                    text-base text-white bg-thatOrange-400 hover:bg-thatOrange-500
                    focus:outline-none focus:border-thatOrange-700
                    focus:ring-that-orange">
                  <a href="mailto:hello@that.us?subject=Let's Partner">
                    Partner with us!
                  </a>
                </div>

                <StandardLink href="/events/{slug}/partners">
                  View all Partners
                </StandardLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/await}
