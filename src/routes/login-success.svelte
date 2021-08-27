<script>
	import { ModalNoAction } from '$elements';
	import seoMetaTags from '$utils/seo/metaTags';

	const metaTags = seoMetaTags({
		title: 'Login Success - THAT',
		description: '',
		openGraph: {
			type: 'website',
			url: `https://that.us/login-success`
		},
		noindex: true,
		nofollow: true
	});
</script>

<svelte:head>
	<title>{metaTags.title}</title>
	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<div>
	<ModalNoAction
		title="Unlocking THAT"
		text="Parsing JSON, Validating Tokens, and configuring THAT."
	/>
</div>
