<script>
	import Layout from '../_components/_Layout.svelte';
	import NewsletterSignup from '$components/newsletter/Wide.svelte';
</script>

<Layout>
	<slot />
	<div class="mt-24">
		<NewsletterSignup />
	</div>
</Layout>
