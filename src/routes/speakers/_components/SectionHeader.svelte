<script>
	export let stepNumber = undefined;
	export let title;
</script>

<h2 class="text-3xl text-gray-800 font-extrabold">
	<div class="flex space-x-4 items-center">
		{#if stepNumber}
			<span
				class="h-8 w-8 bg-white rounded-full flex items-center justify-center ring-4 ring-gray-300"
			>
				<span class="text-sm">{stepNumber}</span>
			</span>
		{/if}

		<div>
			{title}
		</div>
	</div>
</h2>
