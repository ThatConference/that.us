<script context="module">
	import eventsApi from '$dataSources/api.that.tech/events/queries';

	export async function load({ params, fetch }) {
		const { event, year } = params;
		const slug = `${event}/${year}`;

		const { queryEventForCfp } = eventsApi(fetch);

		return {
			props: {
				event: await queryEventForCfp(slug)
			}
		};
	}
</script>

<script>
	export let event;

	import dayjs from 'dayjs';

	import seoMetaTags from '$utils/seo/metaTags';
	import { StandardScroll, Standard as StandardLink } from '$elements/links';
	import Seo from '$components/Seo.svelte';

	import FAQ from '../../_components/faq.svelte';
	import Perks from '../../_components/perks.svelte';
	import EventMeta from '../../_components/eventMeta.svelte';
	import CTA from '../../_components/cta.svelte';

	const metaTags = ((title = `${event?.name} Call For Counselors - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Call For Counselors is now open',
			openGraph: {
				type: 'website',
				url: `https://that.us/call-for-counselors/${event.slug}`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="overflow-hidden py-20">
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="lg:grid lg:grid-cols-5 lg:items-start lg:gap-8">
			<div class="col-span-5 text-center sm:text-left">
				<h2 class="text-2xl text-thatOrange-400">
					Submissions Now Open Through
					<span class="font-extrabold">
						{dayjs(event.callForSpeakersCloseDate).format('dddd, MMMM D, YYYY')}
					</span>
				</h2>
			</div>

			<div class="col-span-2">
				<h1
					class="pb-16 text-center text-4xl font-extrabold leading-10
              tracking-tight text-thatBlue-800 sm:text-left sm:text-5xl
              sm:leading-none md:text-6xl"
				>
					Call for Camp Counselors
				</h1>
			</div>

			<div class="col-span-3 space-y-8">
				<p class="prose-2xl text-gray-500">
					Are you ready to speak at the biggest tech conference in the US Midwest? We are searching
					for hour-long sessions, half and full-day workshops, and keynotes that bring value to our
					community. The sessions and workshops can appeal to developers, designers, testers,
					business owners, site builders, community organizers, and everything in-between.
				</p>

				<div class="flex justify-center space-x-4">
					<div class="flex-none">
						<StandardLink href={`/activities/create/cfp/?event=${event.id}`}>
							Become a Counselor
						</StandardLink>
					</div>

					<div class="flex-none">
						<StandardScroll href="#formatAndDates">View Formats and Dates</StandardScroll>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="relative mt-24">
		<EventMeta {event} />
	</div>

	<div class="mt-24 bg-that-navy">
		<div class="relative mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:px-8 ">
			<div class="lg:grid lg:grid-cols-5 lg:items-start lg:gap-8">
				<div class="col-span-5">
					<h3
						class="text-center text-4xl font-extrabold uppercase tracking-wide text-white sm:text-left"
					>
						Summer Camp for Geeks
					</h3>
				</div>

				<div class="col-span-3">
					<p class="prose-xl text-white">
						THAT Conference is the largest tech event in the US Midwest, and it’s held at a
						waterpark. We are a family-friendly conference and encourage children (geeklings) to
						submit talks as well! We are looking for counselors on a wide variety of topics and
						backgrounds. Do you have a story to tell? Do you have expertise in a specific field to
						share? We want to hear from you!
					</p>
				</div>
				<div class="col-span-2 hidden flex-col items-center lg:visible lg:flex">
					<img
						class="flip h-1/8 sm:absolute sm:h-2/3 sm:translate-y-24 sm:transform"
						src="/images/characters/bear-pig.png"
						alt
					/>
				</div>
			</div>
		</div>
	</div>

	<div id="formatAndDates" />

	<div class="relative mt-24">
		<div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ">
			<div class="flex flex-col justify-center text-center">
				<h2 class="text-4xl font-extrabold uppercase tracking-tighter text-thatBlue-800">
					Speak Online or In-Person, you decide.
				</h2>
			</div>

			<div class="mt-12">
				<p class="prose-lg pt-4 text-center text-gray-500">
					Dare we say we've gone "digital-first"? Sounds fancy, right? The truth is we're a believer
					in continuous refactoring, and let's be honest, the resort isn't big enough for the camp
					we want to set up. THAT Conference is now comprised of two primary delivery methods,
					online or in-person.
				</p>
				<div class="flex pt-12">
					<div class="flex flex-col justify-center">
						<img
							src="/images/characters/what_to_expect_tech_stack.png"
							class="lazyload h-24 w-full object-scale-down"
							alt="a computer"
						/>
					</div>
					<p class="prose-lg flex-grow pt-4 text-left text-gray-500">
						Online activities are solely delivered online, authentic to their audience. They are
						meant to be very interactive, global, and happen at any time for any length of time.
						They're limited to 100 people, but some of the best, most engaging activities happen
						with just a few geeks. The possibilities are endless, and we're excited to have this
						addition.
					</p>
				</div>
				<div class="flex pt-12">
					<p class="prose-lg flex-grow pt-4 text-left text-gray-500">
						In-person activities are just that; they're physically in-person and also authentic to
						their audience. Typically they're orchestrated with a single speaker and limited by time
						and physical space.
					</p>
					<div class="flex flex-col justify-center">
						<img
							src="/images/characters/what_to_expect_professional_networking.png"
							class="lazyload h-24 w-full object-scale-down"
							alt="two geeks high fiving"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-24">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
			<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-32">
				<div class="mt-8 flex flex-col space-y-6">
					<div>
						<h2
							class="text-center text-4xl font-extrabold uppercase tracking-tighter text-thatBlue-800 sm:text-left"
						>
							Audiences And Formats
						</h2>
					</div>
					<div>
						<p class="prose-lg text-gray-500">
							You can apply to speak for the following audiences and formats:
						</p>
					</div>

					<div>
						<h3 class="text-lg font-extrabold tracking-wide text-gray-600">
							Professional & Family Formats
						</h3>

						<p class="prose-lg pt-4 text-gray-500">
							THAT Conference is a professional polyglot technical conference with a rich experience
							for children and other family members. Your session could be aimed at the professional
							track or for family "geeklings".
						</p>
					</div>

					<div>
						<h3 class="text-lg font-extrabold tracking-wide text-gray-600">Standard Sessions</h3>

						<p class="prose-lg pt-4 text-gray-500">
							Standard sessions are 60 minutes each, including time for answering questions. There
							is a 30-minute break in-between each session to nurture those all-important hallway
							conversations.
						</p>
					</div>

					<div>
						<h3 class="text-lg font-extrabold tracking-wide text-gray-600">
							Pre-Conference Workshops
						</h3>

						<p class="prose-lg pt-4 text-gray-500">
							Half-day (four hours) or full-day (8 hours), the day leading into THAT Conference is
							set aside for a full day of workshops. Be prepared to provide attendees a decent
							agenda for what you'll cover.
						</p>
					</div>

					<div>
						<h3 class="text-lg font-extrabold tracking-wide text-gray-600">Keynotes</h3>

						<p class="prose-lg pt-4 text-gray-500">
							Do you have what it takes to give a 90-minute speech on something you're passionate
							about? You'll have an audience of over 1,000 people in front of the stage listening to
							your story. We want topics that'll motivate, energize, and help attendees see the
							world differently as the diverse place it is.
						</p>
					</div>
				</div>

				<!-- right side -->
				<div class="mt-8 flex flex-col space-y-6">
					<div>
						<h2
							class="text-center text-4xl font-extrabold uppercase tracking-tighter text-thatBlue-800 sm:text-left"
						>
							Key Dates You Need To Know
						</h2>
					</div>

					<div>
						<div class="divide-y divide-gray-200">
							{#each event.milestones as milestone}
								<div class="grid grid-cols-2 py-4">
									<div class="text-lg font-extrabold tracking-wide text-gray-500">
										{dayjs(milestone.dueDate).format('MMMM D, YYYY')}
									</div>
									<div class="prose-lg text-gray-500">
										{milestone.title}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<div class="relative inline-block">
						<img
							src="/images/characters/what_to_expect_4_days.png"
							class="lazyload mx-auto h-48 flex-shrink-0"
							alt="a calendar"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="relative mt-24">
	<Perks {event} />
</div>

<div class="relative mt-24">
	<CTA {event} />
</div>

<div class="relative mt-24">
	<FAQ />
</div>

<style>
	.flip {
		transform: scaleX(-1);
	}
</style>
