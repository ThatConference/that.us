<script context="module">
	export async function load({ session }) {
		if (session.user.isAuthenticated) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script>
	export let documentReferrer = '/activities';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import seoMetaTags from '$utils/seo/metaTags';
	import { createAuth } from '$utils/security';
	import { ModalNoAction } from '$elements';

	import Seo from '$components/Seo.svelte';

	const signup = $page.query.get('signup') || false;

	const metaTags = ((title = 'Login - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Login to your THAT account.',
			openGraph: {
				url: `https://that.us/login`
			}
		})
	}))();

	const { login } = createAuth();
	onMount(() => {
		return login(documentReferrer, signup);
	});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<ModalNoAction
		title="Logging In..."
		text="You being redirected to our identity provider to login. Your browser's
    url will be pointed to https://auth.that.tech"
	/>
</div>
