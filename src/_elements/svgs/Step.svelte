<script>
	export let step;
	export let isActive = false;
	export let stepName = '';
	export let href = '#';
	export let rel;

	function onClick(e) {
		if (href === '#') {
			e.preventDefault();
		}
	}
</script>

<a {href} {rel} on:click={onClick} class="flex items-center px-6 py-4 text-sm font-medium">
	<span
		class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2"
		class:border-thatOrange-400={isActive}
		aria-current="step">
		<span class:text-thatOrange-400={isActive}>{step}</span>
	</span>
	<span class="ml-4 text-sm font-medium" class:text-thatOrange-400={isActive}>
		{stepName}
	</span>
</a>
