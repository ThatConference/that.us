<script>
	export let title = '';
</script>

<header class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between">
			<h1 class="text-4xl font-bold tracking-tight  text-white sm:text-5xl">
				<slot name="title">{title}</slot>
			</h1>
			<span class="inline-flex rounded-md shadow-sm">
				<slot />
			</span>
		</div>
	</div>
</header>
