<script>
	export let title = '';
	export let description = '';
	export let stepNumber;
</script>

<div class="pb-2 pt-20">
	<div class="relative">
		<div class="absolute inset-0 flex items-center" aria-hidden="true">
			<div class="w-full border-t border-gray-300" />
		</div>
		<div class="relative flex items-center">
			<div class="block bg-gray-100 px-1">
				<span
					class="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-4 ring-gray-300">
					{stepNumber}
				</span>
			</div>

			<span class="bg-gray-100 px-4 text-lg font-medium text-gray-900">
				{title}
			</span>
		</div>
	</div>
	{#if description}
		<p class="px-14 py-2 text-sm text-gray-400">
			{description}
		</p>
	{/if}
</div>
