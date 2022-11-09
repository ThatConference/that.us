<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Highlight as HighlightLink, Standard as StandardLink } from '$elements/links';

	import Layout from './_components/_Layout.svelte';
	import Header from './_components/_Header.svelte';
	import WelcomeQuote from './_components/_WelcomeQuote.svelte';

	const metaTags = ((title = 'Getting Started - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/support`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<Header>Welcome to THAT!</Header>
	<section>
		<div
			class="relative mx-auto mb-8 max-w-prose text-base text-lg leading-7
        text-gray-500 lg:mx-0 lg:max-w-5xl lg:pr-72">
			<p>
				Here at THAT, it's our mission to help foster the best community of geeks on this planet.
				Our vision, create an interactive platform connecting Geeks and Geeklings across the globe
				in such a way they can help one another whenever and wherever regardless of topic or format.
			</p>

			<p class="mt-8">
				We created THAT to fill a gap between the times when we cannot physically connect. We
				believe peer-to-peer learning is one of the most powerful ways we can help one another any
				day of the year.
			</p>
		</div>
		<div
			class="text-base text-lg leading-7 text-gray-500 lg:grid lg:grid-cols-2
        lg:items-start lg:gap-8">
			<div class="relative mb-12 lg:mb-0">
				<div
					class="prose mx-auto mb-10 text-base text-lg leading-7
            text-gray-500 lg:max-w-none">
					<h2>The What</h2>

					<p>
						Let’s say you want to have a code review or a design review, great. Maybe you want to
						share your experience with the latest JavaScript framework or seek some geek parenting
						advice. There are no limits, there are no artificial boundaries. Just people helping
						people be awesome.
					</p>

					<p class="mt-8">
						In short, anyone, at any time can create what we call an Activity. The format of an
						Activity is simple, a video call in the browser, no tools required. Every Activity has a
						chat window, you're able to share your desktop, your webcam and mic are enabled. Our
						goal is to create the best virtual face-to-face conversation possible but give you the
						room to have any type of conversation you need. We're grateful you're here and now we
						want to make sure you have the information you need to get involved with THAT.
					</p>

					<p>Things you should know:</p>
					<ul>
						<li>
							<a href="/support/what-is-an-activity/"> What is an Activity? </a>
						</li>
						<li>
							<a href="/support/joining-an-activity/"> How to join an Activity. </a>
						</li>
						<li>
							<a href="/support/creating-an-activity/"> How to create an Activity. </a>
						</li>
						<li>
							<a href="/support/staying-up-to-date/"> How to stay up to date. </a>
						</li>
						<li>
							<a href="/my/profiles/primary/">Keep your profile up to date.</a>
						</li>
					</ul>
				</div>
				<div class="mx-auto flex max-w-prose space-x-4 text-base lg:max-w-none">
					<StandardLink href="/activities/">Upcoming Activities</StandardLink>
					<HighlightLink href="/support/what-is-an-activity/">What is an Activity?</HighlightLink>
				</div>
			</div>
			<div class="relative mx-auto max-w-prose text-base lg:max-w-none">
				<WelcomeQuote />
			</div>
		</div>
	</section>
</Layout>
