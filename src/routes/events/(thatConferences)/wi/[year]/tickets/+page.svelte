<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Hero from './_components/Hero.svelte';
	import Professional from './_components/Professional.svelte';
	import Workshops from './_components/Workshops.svelte';
	import Families from './_components/Families.svelte';
	import Notices from '../../../../_components/Notices.svelte';

	import Membership from '../../../../_components/MembershipCard.svelte';

	let { event } = data;

	const metaTags = ((title = 'THAT Conference tickets and discounts explained.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Ticket Breakdown',
			openGraph: {
				type: 'website',
				url: `https://that.us/events/${event.slug}/tickets`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<section class="mt-40">
	<Hero {event} />
</section>

<section id="professionals">
	<Professional {event} />
	<Notices />
</section>

<section id="workshops">
	<Workshops {event} />
</section>

<section id="families">
	<Families {event} />
</section>

<section>
	<Membership {event}>
		<div slot="header">
			<div class="relative flex flex-col items-center justify-center">
				<h2
					class="text-2xl font-extrabold uppercase text-thatBlue-700 antialiased sm:text-3xl lg:text-4xl xl:text-5xl">
					Become a Member
				</h2>

				<p class="mx-auto max-w-6xl text-center text-xl text-gray-500 sm:mt-5 sm:text-2xl">
					We created THAT.us to fill a gap between the times when we cannot physically connect. We
					believe peer-to-peer learning is one of the most powerful ways we can help one another any
					day of the year.
				</p>

				<p class="mx-auto max-w-6xl text-center text-xl text-gray-500 sm:mt-5 sm:text-2xl">
					Every month we host THAT Online aimed at bringing us all together to recenter and
					recharge.
				</p>
			</div>
		</div>
	</Membership>
</section>
