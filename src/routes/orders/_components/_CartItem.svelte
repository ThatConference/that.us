<script>
	export let showBackground = false;
	export let lineItem;
	export let eventDetails;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	$: subTotal = (lineItem.price * lineItem.qty).toFixed(2);

	let currentQty = lineItem.qty;
</script>

<tr class="bg-white" class:bg-gray-50={showBackground}>
	<td class="whitespace-nowrap px-6 py-4 align-top text-sm font-medium text-gray-900">
		<div class="flex flex-col items-center space-y-4">
			{#if eventDetails}
				<div>{eventDetails.name}</div>
				<img class="h-24 w-24" src={eventDetails.logo} alt="event logo" />
			{/if}
		</div>
	</td>
	<td class="whitespace-nowrap px-6 py-4 align-top text-sm font-medium text-gray-900">
		{lineItem.name}
	</td>
	<td class="px-6 py-4 align-top text-sm text-gray-500">
		{lineItem.description}
	</td>
	<td class="whitespace-nowrap px-6 py-4 align-top text-sm text-gray-500">
		${lineItem.price}
	</td>
	<td class="whitespace-nowrap px-6 py-4 align-top text-sm text-gray-500">
		<input
			type="number"
			name="quantity"
			id="quantity"
			bind:value={currentQty}
			on:change={() =>
				dispatch('cart_update', {
					...lineItem,
					quantity: currentQty
				})}
			class="block w-28 rounded-md border border-gray-200 p-2 text-center shadow-sm focus:border-thatOrange-500 focus:ring-thatOrange-500" />
	</td>
	<td class="whitespace-nowrap px-6 py-4 text-right align-top text-sm font-medium">
		<button
			on:click={() => dispatch('cart_remove', { id: lineItem.id })}
			class="text-thatOrange-400 hover:text-thatOrange-500">
			Remove
		</button>
	</td>
	<td class="whitespace-nowrap px-6 py-4 align-top text-sm text-gray-500">{subTotal}</td>
</tr>
