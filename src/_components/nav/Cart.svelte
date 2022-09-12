<script>
	import { getContext } from 'svelte';
	import Cart from '$elements/svgs/Cart.svelte';

	const { state } = getContext('cart');
	$: cartItems = Object.keys($state.context.cart).length;
</script>

{#if cartItems > 0}
	<div class="relative flex items-center justify-center">
		<div class="ml-4 rounded-full p-1 hover:bg-thatBlue-500 hover:text-white focus:text-white">
			<a href="/orders/summary/">
				<Cart />
				<span class="absolute bottom-0 right-0 block animate-pulse">
					<span class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-thatRed-500">
						<span class="font-mediumß text-xs text-white">{cartItems}</span>
					</span>
				</span>
			</a>
		</div>
	</div>
{/if}
