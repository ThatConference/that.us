<script>
	export let data;

	import { fade } from 'svelte/transition';

	import Layout from '$elements/layouts/ContentLayout.svelte';
	import Seo from '$components/Seo.svelte';
	import seoMetaTags from '$utils/seo/metaTags';

	import EventCard from './_components/EventCard.svelte';
	import { ThatActiveEvents } from '../_root/components';

	const metaTags = ((title = 'Upcoming and past events on THAT and THAT Conference.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Upcoming and Past Events at THAT',
			ogImages: {
				twitter: 'events-Twitter.jpg',
				facebook: 'events-Facebook.jpg',
				linkedIn: 'events-LinkedIn.jpg'
			},
			openGraph: {
				type: 'website',
				url: 'https://that.us/events'
			}
		})
	}))();

	let { events = [] } = data;

	const thatConferences = events[0].filter((x) => x.type === 'HYBRID_MULTI_DAY');
	const otherUpcomingEvents = events[0].filter((x) => x.type !== 'HYBRID_MULTI_DAY');
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<main class="overflow-hidden">
		<ThatActiveEvents events={thatConferences} />

		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			<div class="mx-auto mt-32 max-w-screen-xl px-4 sm:px-6 xl:mt-40">
				<main>
					<div class="px-8 py-20">
						<div class="relative mx-auto">
							{#if otherUpcomingEvents.length > 0}
								<div class="mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3">
									{#each otherUpcomingEvents as e (e.id)}
										<div
											in:fade
											class="transform transition duration-500 ease-in-out hover:scale-105">
											<a href={`/events/${e.slug}`}>
												<EventCard event={e} />
											</a>
										</div>
									{/each}
								</div>
							{/if}

							<div class="relative m-12">
								<div class="absolute inset-0 flex items-center" aria-hidden="true">
									<div class="w-full border-t border-gray-300" />
								</div>
								<div class="relative flex justify-center">
									<span
										class="rounded-md bg-white px-2 text-sm uppercase tracking-wider text-gray-500">
										Past Events
									</span>
								</div>
							</div>

							<div class="mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3">
								{#each events[1] as e (e.id)}
									<div
										in:fade
										class="transform transition duration-500 ease-in-out hover:scale-105">
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
