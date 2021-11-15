<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	const metaTags = ((title = 'Speaker Acceptance - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/speakers/accept`
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
			Ball tip ham capicola alcatra prosciutto. Biltong short ribs jowl, salami buffalo swine cow
			pork belly chuck boudin chicken meatball hamburger kielbasa. Strip steak doner chislic short
			ribs pork belly.
		</p>
	</div>
</div>
