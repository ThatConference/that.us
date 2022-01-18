<script>
	import { onMount, getContext } from 'svelte';
	import Layout from '../_components/_Layout.svelte';
	import NewsletterSignup from '$components/newsletter/Wide.svelte';

	const { send } = getContext('cart');

	onMount(() => {
		send('CLEAR_CART');
	});
</script>

<Layout>
	<slot />
	<div class="mt-24">
		<NewsletterSignup />
	</div>
</Layout>
