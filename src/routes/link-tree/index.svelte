<script context="module">
	import communityQueryApi from '$dataSources/api.that.tech/community/queries';

	export async function load({ fetch }) {
		const { queryActiveThatEvents } = communityQueryApi(fetch);
		const events = await queryActiveThatEvents();

		const filtered = events.filter((x) => x.type === 'HYBRID_MULTI_DAY');

		return {
			props: {
				events: filtered
			}
		};
	}
</script>

<script>
	export let events;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import UpcomingTC from '$components/events/thatconference/Upcoming.svelte';
	// import { Standard as StandardLink } from '$elements/links';
	// import Newsletter from '$components/newsletter/Short.svelte';

	import socials from '$dataSources/local/socials';
	import Social from './_components/Social.svelte';

	const metaTags = ((title = 'Create your THAT account and profile today and get involved.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create your account today and join in the conversation.',
			openGraph: {
				url: `https://that.us/link-tree/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="overflow-hidden py-20">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<UpcomingTC {events} />

			<main>
				<section class="my-12">
					<div>
						<h2
							class="text-4xl font-extrabold leading-10 tracking-tight  text-thatBlue-800 
							sm:text-center sm:text-5xl sm:leading-none  
							md:text-6xl 
							lg:text-left">
							Stay In Touch
						</h2>
					</div>
					<div
						class="my-12 grid grid-cols-3 place-content-center place-items-center gap-6 md:grid-cols-4">
						{#each socials as s}
							<div
								class="transform cursor-pointer transition duration-500 ease-in-out hover:scale-110">
								<div
									class="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-thatBlue-700 p-4">
									<a href={s.href} aria-label={s.ariaLabel} target="_blank" rel="noopener">
										<Social {...s} />
									</a>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<section>
					<div>store</div>
				</section>

				<section>
					<div>blog</div>
				</section>

				<section>
					<div>signup</div>
				</section>

				<section>
					<div>signup</div>
				</section>
			</main>
		</div>
	</div>
</Layout>
