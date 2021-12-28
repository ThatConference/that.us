<script>
	export let title;
	export let preText = 'THAT Legal Stuff';

	import Layout from '../ContentLayout.svelte';
	import Header from './_Header.svelte';
</script>

<Layout>
	<div class="py-20 overflow-hidden">
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<Header center="true" pretext={preText}>{title}</Header>
			<slot />
		</div>
	</div>
</Layout>
