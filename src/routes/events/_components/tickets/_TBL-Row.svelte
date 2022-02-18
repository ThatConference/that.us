<script>
	export let title;
	export let included = [];

	import { Check, Minus } from '$elements/svgs';
</script>

<tr>
	<th class="py-2 pl-6 pr-6 text-left text-sm font-normal text-gray-500" scope="row">
		{title}
	</th>

	{#each included as i}
		<td class="px-6">
			<div class="flex justify-center">
				{#if i}
					{#if i === true}
						<span class="text-green-500"><Check /></span>
						<span class="sr-only">Included in this option.</span>
					{:else}
						<span class="text-gray-700">{i}</span>
					{/if}
				{:else}
					<span class="text-gray-300">
						<Minus />
						<span class="sr-only">Not included in this option.</span>
					</span>
				{/if}
			</div>
		</td>
	{/each}
</tr>
