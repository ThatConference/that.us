<script>
	export let title;
	export let completed = false;
	export let isLastItem = false;
	export let stepNumber;

	import Icon from 'svelte-awesome';
	import { flagCheckered } from '$components/svelte-awesome-icons';

	import { CheckFull } from '$elements/svgs';
</script>

<div class="relative pb-8">
	{#if !isLastItem}
		<span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
	{/if}

	<div class="relative flex space-x-3 text-gray-500">
		<div>
			{#if completed}
				<span class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
					<CheckFull />
				</span>
			{:else}
				<span
					class="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-4 ring-gray-300">
					{#if isLastItem}
						<Icon data={flagCheckered} class="h-4 w-4" />
					{:else}
						<span class="text-sm">{stepNumber}</span>
					{/if}
				</span>
			{/if}
		</div>
		<div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
			<div class="text-sm ">
				{title}
			</div>
		</div>
	</div>
</div>
