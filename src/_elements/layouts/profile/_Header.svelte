<script>
	export let subtitle = 'Spotlight';
	export let center = false;
</script>

<div class="mx-auto max-w-prose text-base lg:max-w-none" class:text-center={center}>
	<p
		class="text-base font-semibold uppercase leading-6 tracking-wide
			text-thatOrange-400">
		{subtitle}
	</p>
	<h1
		class="mb-8 mt-2 text-3xl font-extrabold leading-8 tracking-tight
			text-gray-900 sm:text-4xl sm:leading-10">
		<slot />
	</h1>
</div>
