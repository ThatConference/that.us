<script>
	import Layout from '$elements/layouts/ContentLayout.svelte';
</script>

<Layout>
	<main class="relative overflow-x-hidden">
		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			<div class="mt-32 mx-auto max-w-screen-xl px-4 sm:px-6">
				<slot />
			</div>
		</div>
	</main>
</Layout>
