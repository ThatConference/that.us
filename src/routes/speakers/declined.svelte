<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	const metaTags = ((title = 'Counselor Acceptance Declined - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/speakers/declined/`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="text-base max-w-prose mx-auto lg:max-w-none">
	<h2 class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase">
		Counselor Acceptance Declined
	</h2>
	<p
		class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900"
	>
		We're sorry to see you go.
	</p>
	<div class="mt-12">
		<p class="prose prose-lg">
			Things happen, plans change, we understand. If you have any feedback for us, we're all ears
			and would love to hear your thoughts. Don't forget THAT happens every day of the year. You can
			always kick up your an activity anytime or join us for THAT Online on the 15th of every month.
			We hope to see you around!
		</p>
	</div>
</div>
