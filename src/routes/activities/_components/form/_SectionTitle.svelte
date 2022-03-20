<script>
	export let title = '';
	export let description = '';

	import Icon from 'svelte-awesome';
	import { stepForward } from '$components/svelte-awesome-icons';
</script>

<div class="pt-20 pb-2">
	<div class="relative">
		<div class="absolute inset-0 flex items-center" aria-hidden="true">
			<div class="w-full border-t border-gray-300" />
		</div>
		<div class="relative flex items-center">
			<div class="block bg-gray-100 px-1">
				<span
					class="flex h-8 w-8 items-center justify-center rounded-full bg-white ring-4 ring-gray-300">
					<Icon data={stepForward} class="h-4 w-4 text-gray-500" />
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
