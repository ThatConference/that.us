<script>
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import ProfileLayout from '$elements/layouts/Profile.svelte';

	import CommunityCore from './_components/_CommunityCore.svelte';

	const { community } = $page.params;

	const metaTags = seoMetaTags({
		title: 'Community - THAT',
		description: 'tbd',
		openGraph: {
			type: 'website',
			url: `https://that.us/communities`
		}
	});
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<ProfileLayout>
	<CommunityCore slug={community} />
</ProfileLayout>
