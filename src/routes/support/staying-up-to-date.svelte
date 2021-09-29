<script>
	import { onMount, onDestroy } from 'svelte';
	import Clipboard from 'clipboard';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Highlight as HighlightLink, Standard as StandardLink } from '$elements/links';

	import Layout from './_components/_Layout.svelte';
	import Header from './_components/_Header.svelte';

	const metaTags = ((title = 'Staying Up To Date - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/support/join-activity`
			}
		})
	}))();

	let clipboard;
	let copiedText = 'https://bit.ly/2YRdVxy';

	onMount(() => {
		clipboard = new Clipboard('#calendarUrl');

		clipboard.on('success', function (e) {
			copiedText = 'Copied!';
		});
	});

	onDestroy(() => {
		clipboard.destroy();
	});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header center={true}>Staying Up To Date</Header>
	<section>
		<div class="prose prose-lg text-gray-500 mx-auto">
			<p>
				Life moves fast and you have enough to sift through already. Our goal is to make it very
				easy to stay up to date with everything THAT, while not becoming refrigerator noise. To that
				end, we currently have three different ways you can stay up to date.
			</p>

			<ul>
				<li>The Activity Board & My Favorites.</li>
				<li>Subscribe to our shared calendar.</li>
				<li>#that_board in Slack.</li>
			</ul>

			<h2>Activity Board and My Favorites</h2>
			<p>
				<a href="/activities/">The Activity Board</a>
				as we call it, is your main place to find out what's up next. It will always show all Activities
				from today looking forward. You can also find
				<strong class="italic">all</strong>
				Activities
				<a href="/events/thatUs/">here</a>.
			</p>

			<p>
				<a href="/my/favorites/">My Favorites</a>
				is just like the Activity Board but filtered to the Activities you've already favorited. This
				is great during times of high usage or for historical reasons.
			</p>

			<h2>Calendar Feed</h2>
			<p>
				Most people live by their calendars. We've created a shared Google calendar that you can
				subscribe to. This calendar is updated as Activities are created and every entry reflects
				all of the same information you would find on the Activity details page. The link below will
				copy to your clipboard for you to use in your favorite calendar program.
			</p>

			<div class="text-center">
				<button
					id="calendarUrl"
					data-clipboard-text="https://bit.ly/2YRdVxy"
					class="px-4 py-2 rounded-md shadow text-base leading-6 font-medium border-2
        border-thatBlue-500 text-thatBlue-500 bg-white hover:bg-thatBlue-500
        hover:text-white focus:bg-thatBlue-500 focus:text-white focus:outline-none
        focus:ring-thatBlue-500 focus:border-thatBlue-800 transition
        duration-150 ease-in-out md:text-lg md:px-10"
				>
					{copiedText}
				</button>
			</div>

			<h2>#that_board in THAT Slack</h2>
			<p>
				Of course, we wouldn't forget our very active Slack Channel. There is a dedicated channel in
				our Slack (#that_board) which not only receives real-time updates when the Activities are
				created but will also send a daily and hourly digest when an Activity is scheduled. If
				you're not in our Slack, join us today!
			</p>

			<div class="text-center my-12">
				<StandardLink open={true} href="https://thatslack.thatconference.com">
					Join us in THAT Slack
				</StandardLink>
			</div>

			<p>
				Over time we will continue to extend THAT in new and interesting ways. It's our goal to
				connect you to the relevant topics and help you grow your network accordingly based on your
				interests.
			</p>
		</div>
		<div
			class="my-12 max-w-prose mx-auto lg:max-w-none flex flex-col items-center
        justify-center"
		>
			<div class="flex space-x-4 text-base">
				<StandardLink href="/support/creating-an-activity/">Create an Activity</StandardLink>
				<HighlightLink href="/activities/">Check out the upcoming Activities</HighlightLink>
			</div>
		</div>
	</section>
</Layout>
