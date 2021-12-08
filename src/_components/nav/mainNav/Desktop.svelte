<script>
	import { getContext } from 'svelte';
	import Icon from 'svelte-awesome';
	import { plus } from '$components/svelte-awesome-icons';

	import { Cart } from '$elements/svgs';
	import UserProfile from '../_UserProfile.svelte';
	import links from './links';

	const { state } = getContext('cart');

	$: cartItems = Object.keys($state.context.cart).length;
</script>

<div class="hidden lg:flex md:items-center md:justify-between text-gray-500">
	<div class="md:flex md:ml-10 md:pr-4">
		{#each links as l}
			<a
				href={l.href}
				class="ml-1 px-3 py-2 font-medium text-sm text-gray-500  rounded-md
        hover:text-white hover:bg-that-blue hover:bg-opacity-50 focus:outline-none
          focus:text-white focus:bg-that-blue
          transition duration-150 ease-in-out"
			>
				<div class="flex items-center">
					<svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M11 0h3L9 20H6l5-20z" />
					</svg>
					<span>{l.text}</span>
				</div>
			</a>
		{/each}
	</div>

	<div class="flex items-center">
		<div class="relative inline-block">
			<div class="ml-4 p-1 rounded-full  hover:text-white hover:bg-thatBlue-500 focus:text-white">
				<a href="/orders/summary/">
					<Cart />
					{#if cartItems > 0}
						<span class="animate-pulse absolute bottom-0 right-0 block">
							<span
								class="inline-flex items-center justify-center h-4 w-4 rounded-full bg-gray-500"
							>
								<span class="text-xs font-medium leading-none text-white">{cartItems}</span>
							</span>
						</span>
					{/if}
				</a>
			</div>
		</div>

		<div class="ml-4 p-1 rounded-full  hover:text-white  hover:bg-thatBlue-500 focus:text-white">
			<a href="/activities/create/">
				<Icon data={plus} class="h-8 w-8" />
			</a>
		</div>

		<div class="ml-4 p-1 rounded-full md:flex text-that-orange hover:text-thatOrange-500 hover:bg-thatBlue-500 focus:text-white">
			<UserProfile />
		</div>
	</div>
</div>
