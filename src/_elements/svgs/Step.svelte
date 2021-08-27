<script>
	export let step;
	export let isActive = false;
	export let stepName = '';
	export let href = '#';
</script>

<a on:click class="px-6 py-4 flex items-center text-sm font-medium">
	<span
		class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 rounded-full"
		class:border-thatOrange-400={isActive}
		aria-current="step"
	>
		<span class:text-thatOrange-400={isActive}>{step}</span>
	</span>
	<span class="ml-4 text-sm font-medium" class:text-thatOrange-400={isActive}>
		{stepName}
	</span>
</a>
