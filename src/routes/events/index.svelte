<script context="module">
	import dayjs from 'dayjs';
	import lodash from 'lodash';
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	const { sortBy, take, drop } = lodash;

	export async function load({}) {
		const queryEvents = () =>
			eventsApi()
				.queryEventsByCommunity()
				.then((r) => sortBy(r, 'endDate').reverse())
				.then((r) => {
					const splitAt = r.findIndex((i) => dayjs(i.endDate).isBefore(dayjs()));

					const upcoming = take(r, splitAt)
						.filter((i) => i.type.toLowerCase() !== 'daily')
						.reverse();
					const past = drop(r, splitAt);

					return [upcoming, past];
				});

		return {
			props: {
				events: await queryEvents()
			}
		};
	}
</script>

<script>
	export let events = [];

	import { fade } from 'svelte/transition';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import Hero from './_components/events/_EventsHero.svelte';
	import EventCard from './_components/_EventCard.svelte';

	const metaTags = ((title = 'Events - THAT') => ({
		title,
		tags: seoMetaTags({
			title: 'Events - THAT',
			description: 'Upcoming and Past Events at THAT',
			openGraph: {
				type: 'website',
				url: 'https://that.us/events'
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<main class="overflow-hidden">
		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			<div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6 xl:mt-40">
				<main>
					<Hero />
					<div class="py-20 px-8">
						<div class="relative mx-auto">
							<div class="mt-12 max-w-lg mx-auto grid gap-10 lg:grid-cols-3 lg:max-w-none">
								{#each events[0] as e (e.id)}
									<div
										in:fade
										class="transition duration-500 ease-in-out transform hover:scale-105"
									>
										<a href={`/events/${e.slug}`}>
											<EventCard event={e} />
										</a>
									</div>
								{/each}
							</div>

							<div class="relative m-12">
								<div class="absolute inset-0 flex items-center" aria-hidden="true">
									<div class="w-full border-t border-gray-300" />
								</div>
								<div class="relative flex justify-center">
									<span
										class="uppercase tracking-wider px-2 bg-white rounded-md text-sm text-gray-500"
									>
										Past Events
									</span>
								</div>
							</div>

							<div class="mt-12 max-w-lg mx-auto grid gap-10 lg:grid-cols-3 lg:max-w-none">
								{#each events[1] as e (e.id)}
									<div
										in:fade
										class="transition duration-500 ease-in-out transform hover:scale-105"
									>
										<a href={`/events/${e.slug}`}>
											<EventCard event={e} />
										</a>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</main>
</Layout>
