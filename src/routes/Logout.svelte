<script>
	import { onMount } from 'svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { logout } from '$utils/security.js';
	import { ModalNoAction } from '$elements';

	const metaTags = seoMetaTags({
		title: 'Logout - THAT',
		description: 'Logout of your THAT account.',
		openGraph: {
			type: 'website',
			url: `https://that.us/logout`
		},
		noindex: true,
		nofollow: true
	});

	onMount(async () => {
		await logout();
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
		title="Logging Out..."
		text="You will be redirect to our home page once completed."
	/>
</div>
