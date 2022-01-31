<script context="module">
	import { events } from '$utils/config';
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	export async function load({ fetch }) {
		const { queryThatConferenceEvent } = eventsApi(fetch);

		const [tx, wi] = await Promise.all([
			queryThatConferenceEvent(events.next.tx.slug),
			queryThatConferenceEvent(events.next.wi.slug)
		]);

		return {
			props: {
				tx,
				wi
			}
		};
	}
</script>

<script>
	export let wi, tx;

	import dayjs from 'dayjs';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	const metaTags = ((title = 'THAT Conference Texas and Wisconsin') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Join us at THAT Conference Wisconsin or THAT Conference Texas. You choose.',
			openGraph: {
				type: 'website',
				url: `https://that.us/that-conference/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="py-20 overflow-hidden">
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<header>
				<h1
					class="sm:text-center lg:text-left pb-16 text-4xl tracking-tight
          leading-10 font-extrabold text-thatBlue-800 sm:text-5xl
          sm:leading-none md:text-6xl"
				>
					Pick THAT Conference!
				</h1>
			</header>

			<div class="flex flex-col md:grid md:grid-cols-2 gap-4 place-content-center">
				<div class="transition duration-500 ease-in-out transform hover:scale-105 p-12">
					<a sveltekit:prefetch href={`/events/${events.next.wi.slug}`}>
						<img
							src="/images/THAT-Conference-Wisconsin-Logo.svg"
							alt="THAT Conference Wisconsin Logo"
						/>
					</a>
					<div class="flex flex-col items-center mt-12 text-xl font-extrabold text-thatBlue-500">
						<div class="text-center">
							{dayjs(wi.startDate).format('dddd MMMM D, YYYY')} - {dayjs(wi.endDate).format(
								'dddd MMMM D, YYYY'
							)}
						</div>
						<div class="mt-4">
							{wi.venues[0].city}, {wi.venues[0].state}
						</div>
					</div>
				</div>

				<div class="transition duration-500 ease-in-out transform hover:scale-105 p-12">
					<a sveltekit:prefetch href={`/events/${events.next.tx.slug}`}>
						<img src="/images/THAT-Conference-Texas-Logo.svg" alt="THAT Conference Texas Logo" />
					</a>

					<div class="flex flex-col items-center mt-12 text-xl font-extrabold text-thatBlue-500">
						<div class="text-center">
							{dayjs(tx.startDate).format('dddd MMMM D, YYYY')} - {dayjs(tx.endDate).format(
								'dddd MMMM D, YYYY'
							)}
						</div>
						<div class="mt-4">
							{tx.venues[0].city}, {tx.venues[0].state}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</Layout>
