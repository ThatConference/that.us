<script>
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import ProfileLayout from '$elements/layouts/Profile.svelte';

	import CommunityCore from './_components/_CommunityCore.svelte';

	const { community } = $page.params;

	const metaTags = ((title = 'Community - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'tbd',
			openGraph: {
				type: 'website',
				url: `https://that.us/communities`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ProfileLayout>
	<CommunityCore slug={community} />
</ProfileLayout>
