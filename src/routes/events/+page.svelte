<script>
	export let data;

	import { fade } from 'svelte/transition';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import Hero from './_components/events/_EventsHero.svelte';
	import EventCard from './_components/_EventCard.svelte';

	let { events = [] } = data;
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
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<main class="overflow-hidden">
		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			<div class="mx-auto mt-32 max-w-screen-xl px-4 sm:px-6 xl:mt-40">
				<main>
					<Hero />
					<div class="py-20 px-8">
						<div class="relative mx-auto">
							<div class="mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3">
								{#each events[0] as e (e.id)}
									<div
										in:fade
										class="transform transition duration-500 ease-in-out hover:scale-105">
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
