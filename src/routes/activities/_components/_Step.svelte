<script>
	export let title;
	export let completed = false;
	export let isLastItem = false;
	export let stepNumber;

	import Icon from 'svelte-awesome';
	import { flagCheckered } from 'svelte-awesome/icons';

	import { CheckFull } from '$elements/svgs';
</script>

<div class="relative pb-8">
	{#if !isLastItem}
		<span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
	{/if}

	<div class="relative flex space-x-3">
		<div>
			{#if completed}
				<span
					class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white"
				>
					<CheckFull />
				</span>
			{:else}
				<span
					class="h-8 w-8 bg-white rounded-full flex items-center justify-center ring-4 ring-gray-300"
				>
					{#if isLastItem}
						<Icon data={flagCheckered} class="text-gray-500 w-4 h-4" />
					{:else}
						<span class="text-sm text-gray-500">{stepNumber}</span>
					{/if}
				</span>
			{/if}
		</div>
		<div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
			<div>
				<p class="text-sm text-gray-500">{title}</p>
			</div>
		</div>
	</div>
</div>
