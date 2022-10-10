<script>
	import Layout from '$elements/layouts/ContentLayout.svelte';
</script>

<Layout>
	<main class="relative">
		<div class="mx-auto mt-24 max-w-screen-xl px-4">
			<slot />
		</div>
	</main>
</Layout>
