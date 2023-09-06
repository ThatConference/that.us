<script>
	export let eventId;
	export let eventSlug;
	export let isBlogLayout = false;

	import gFetch from '$utils/gfetch';
	import envConfig from '$utils/config.public';
	import { Standard as StandardLink, Highlight as HighlightLink } from '$elements/links';

	const GET_PARTNERS = `
    query getCurrentEvent($id: ID, $eventSlug: String) {
      events {
        event(findBy: { id: $id, slug: $eventSlug }) {
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
	const EXPLORER_LEVEL = ['EXPLORER'];

	function queryPartners() {
		let eId = undefined;
		if (!eventSlug) {
			eId = eventId ? eventId : envConfig.eventId;
		}

		return gFetch()
			.query({ query: GET_PARTNERS, variables: { id: eId, eventSlug } })
			.then(({ data }) => {
				const results = data.events.event.get;

				return {
					slug: results.slug,
					partners: results.partners.filter((partner) =>
						PARTNER_LEVELS_TO_DISPLAY.includes(partner.level)
					),
					explorers: results.partners.filter((partner) => EXPLORER_LEVEL.includes(partner.level))
				};
			});
	}
</script>

{#await queryPartners() then { slug, partners, explorers }}
	{#if partners.length > 0 || explorers.length > 0}
		{#if !isBlogLayout}
			<div class="relative overflow-hidden">
				<div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
					<div class="my-12 flex flex-col items-start sm:items-center">
						<h1
							class="text-thatBlue-700 antialiased font-extrabold uppercase text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
							Our Featured Camp Sponsors
						</h1>
					</div>

					<div class="flex flex-col sm:grid grid-cols-6 gap-8">
						<div class="hidden sm:block col-span-2 place-self-center p-4">
							<img
								class="lazyload w-1/2 sm:w-full"
								src="/images/characters/octopus_with_flag.png"
								alt="OctoPartner" />
						</div>

						<div class="col-span-4 place-self-center">
							<div class="flex flex-col space-y-8">
								<div class="flex flex-wrap items-center justify-center">
									{#each partners as p}
										<div
											class="p-2 w-1/2 transition duration-500 ease-in-out transform hover:scale-105">
											<a href="/partners/{p.slug}/">
												<img class="lazyload w-full h-24" src={p.companyLogo} alt={p.companyName} />
											</a>
										</div>
									{/each}
								</div>

								<div class="flex flex-wrap items-center justify-center">
									{#each explorers as p}
										<div
											class="p-4 w-1/5 transition duration-500 ease-in-out transform hover:scale-105">
											<a href="/partners/{p.slug}/">
												<img class="lazyload w-full h-24" src={p.companyLogo} alt={p.companyName} />
											</a>
										</div>
									{/each}
								</div>

								<div class="flex flex-col items-center">
									<a class="font-semibold text-gray-500" href="/partners/{slug}/"
										>Visit This Year's<span class="pl-1 font-extrabold text-thatRed-500"
											>Sponsors</span
										></a>
								</div>
							</div>
						</div>
					</div>

					<div
						class="my-12 flex flex-col sm:flex-row justify-around items-center space-y-12 sm:space-x-4">
						<div>
							<h2 class="font-bold uppercase text-gray-500 text-2xl">
								Learn more about our sponsorship opportunities?
							</h2>
							<p class="mt-4 prose text-gray-500 text-xl">
								We partner with industry-leading organizations and companies that are looking to
								connect with software practitioners, businesses, and industry leaders.
							</p>
						</div>

						<div class="flex-none">
							<HighlightLink href="/sponsorships/apply/#prospectus">
								<span class="text-xl">Sponsor Today!</span>
							</HighlightLink>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="relative py-8 lg:py-16">
				<div class="flex flex-col">
					<div class="font-extrabold uppercase text-gray-500 text-3xl">
						Our Featured Camp Sponsors
					</div>

					<div class="flex flex-wrap items-center justify-center">
						{#each partners as p}
							<div class="p-4 w-1/3 transition duration-500 ease-in-out transform hover:scale-105">
								<a href="/partners/{p.slug}/">
									<img class="lazyload w-full h-24" src={p.companyLogo} alt={p.companyName} />
								</a>
							</div>
						{/each}
					</div>

					<div class="flex justify-center">
						<StandardLink href="/partners/{slug}/">View all Sponsors</StandardLink>
					</div>

					<div class="mt-24 font-bold uppercase text-gray-500 text-2xl">
						Interested In Sponsorship Opportunities?
					</div>

					<div class="mt-6 prose text-gray-500 text-xl">
						We partner with industry-leading organizations and companies that are looking to connect
						with software developers and practitioners.
					</div>

					<div class="mt-6 flex justify-center">
						<StandardLink href="/sponsorships/apply/#prospectus">Tell Me More</StandardLink>
					</div>
				</div>
			</div>
		{/if}
	{/if}
{/await}
