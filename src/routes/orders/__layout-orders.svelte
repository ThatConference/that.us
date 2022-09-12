<script>
	import Layout from './_components/_Layout.svelte';
	import Prerequisites from './_components/_Prerequisites.svelte';
</script>

<Layout>
	<div class="lg:flex lg:justify-between">
		<div>
			<h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
				Order Summary
			</h2>

			<div class="mt-6">
				<Prerequisites />
			</div>
		</div>
	</div>

	<slot />
</Layout>
