<script>
	import Layout from '$elements/layouts/ContentLayout.svelte';
</script>

<Layout>
	<div class="overflow-hidden py-20">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<slot />
		</div>
	</div>
</Layout>
