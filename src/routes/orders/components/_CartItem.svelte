<script>
  export let showBackground = false;
  export let lineItem;

  import { createEventDispatcher } from 'svelte';
  import { Link } from 'yrv';

  const dispatch = createEventDispatcher();
  $: subTotal = (lineItem.price * lineItem.qty).toFixed(2);

  let currentQty = lineItem.qty;
</script>

<tr class="bg-white" class:bg-gray-50="{showBackground}">
  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    {lineItem.title}
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    {lineItem.description}
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    ${lineItem.price}
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    <input
      type="text"
      name="quantity"
      id="quantity"
      bind:value="{currentQty}"
      class="p-2 text-center block shadow-sm focus:ring-thatOrange-500 focus:border-thatOrange-500 border border-gray-200 rounded-md"
    />
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
    <Link
      on:click="{() => dispatch('cart_update', {
          ...lineItem,
          quantity: currentQty,
        })}"
      class="text-thatOrange-400 hover:text-thatOrange-500"
    >
      Update
    </Link>
    /
    <Link
      on:click="{() => dispatch('cart_remove', {
          productId: lineItem.productId,
        })}"
      class="text-thatOrange-400 hover:text-thatOrange-500"
    >
      Remove
    </Link>
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subTotal}</td>
</tr>
