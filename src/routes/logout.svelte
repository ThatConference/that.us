<script>
	import { onMount } from 'svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { getAuth } from '$utils/security';

	import { ModalNoAction } from '$elements';
	import Seo from '$components/Seo.svelte';

	const { logout } = getAuth();
	const metaTags = ((title = 'Logout - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Logout of your THAT account.',
			openGraph: {
				type: 'website',
				url: `https://that.us/logout`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	onMount(async () => {
		await logout();
	});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<ModalNoAction
		title="Logging Out..."
		text="You will be redirect to our home page once completed."
	/>
</div>
