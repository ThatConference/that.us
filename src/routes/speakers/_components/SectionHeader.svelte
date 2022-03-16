<script>
	export let stepNumber = undefined;
	export let title;
</script>

<h2 class="text-3xl font-extrabold text-gray-800">
	<div class="flex items-center space-x-4">
		{#if stepNumber}
			<span
				class="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-4 ring-gray-300">
				<span class="text-sm">{stepNumber}</span>
			</span>
		{/if}

		<div>
			{title}
		</div>
	</div>
</h2>
