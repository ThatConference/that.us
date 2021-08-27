<script>
	export let documentReferrer = '/activities';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import { login } from '$utils/security.js';
	import { ModalNoAction } from '$elements';

	const signup = $page.query.get('signup') || false;

	const metaTags = seoMetaTags({
		title: 'Login - THAT',
		description: 'Login to your THAT account.',
		openGraph: {
			type: 'website',
			url: `https://that.us/login`
		}
	});

	onMount(async () => {
		await login(documentReferrer, signup);
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
		title="Logging In..."
		text="You being redirected to our identity provider to login. Your browser's
    url will be pointed to https://auth.that.tech"
	/>
</div>
