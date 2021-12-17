<script>
	export let showBackground = false;
	export let lineItem;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	$: subTotal = (lineItem.price * lineItem.qty).toFixed(2);

	let currentQty = lineItem.qty;
</script>

<tr class="bg-white" class:bg-gray-50={showBackground}>
	<td class="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-gray-900">
		{lineItem.name}
	</td>
	<td class="px-6 py-4 align-top text-sm text-gray-500">
		{lineItem.description}
	</td>
	<td class="px-6 py-4 align-top whitespace-nowrap text-sm text-gray-500">
		${lineItem.price}
	</td>
	<td class="px-6 py-4 align-top whitespace-nowrap text-sm text-gray-500">
		<input
			type="number"
			name="quantity"
			id="quantity"
			bind:value={currentQty}
			class="p-2 text-center block shadow-sm focus:ring-thatOrange-500 focus:border-thatOrange-500 border border-gray-200 rounded-md"
		/>
	</td>
	<td class="px-6 py-4 align-top whitespace-nowrap text-right text-sm font-medium">
		<a
			on:click={() =>
				dispatch('cart_update', {
					...lineItem,
					quantity: currentQty
				})}
			class="text-thatOrange-400 hover:text-thatOrange-500"
		>
			Update
		</a>
		/

		<a
			on:click={() => dispatch('cart_remove', { id: lineItem.id })}
			class="text-thatOrange-400 hover:text-thatOrange-500"
		>
			Remove
		</a>
	</td>
	<td class="px-6 py-4 align-top whitespace-nowrap text-sm text-gray-500">{subTotal}</td>
</tr>
