<script>
	import { ModalNoAction } from '$elements';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	const metaTags = ((title = 'Login Success - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/login-success`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<ModalNoAction
		title="Unlocking THAT"
		text="Parsing JSON, Validating Tokens, and configuring THAT."
	/>
</div>
