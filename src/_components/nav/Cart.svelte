<script>
	import { getContext } from 'svelte';
	import Cart from '$elements/svgs/Cart.svelte';

	const { state } = getContext('cart');
	$: cartItems = Object.keys($state.context.cart).length;
</script>

<div class="relative inline-block h-12 w-12 ">
	<div class="rounded-full p-2  hover:bg-thatBlue-500 hover:text-white focus:text-white">
		<a href="/orders/summary/">
			<Cart />
			{#if cartItems > 0}
				<span class="absolute bottom-0 right-0 block animate-pulse">
					<span class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-500">
						<span class="text-xs font-medium leading-none text-white">{cartItems}</span>
					</span>
				</span>
			{/if}
		</a>
	</div>
</div>
