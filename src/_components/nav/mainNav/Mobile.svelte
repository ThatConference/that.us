<script>
	import { page } from '$app/stores';
	import { Standard as StandardLink } from '$elements/links';

	import MobileUsersProfile from '../MobileUsersProfile.svelte';
	import ClaimCart from '../ClaimCart.svelte';
	import Cart from '../Cart.svelte';
	import AddActivity from '../AddActivity.svelte';
	import links from './links';
</script>

{#each links as l}
	<a
		href={l.href}
		class="block rounded-md px-3 py-2 text-base font-medium text-gray-700
    transition duration-150 ease-in-out hover:bg-gray-50
    hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 focus:outline-none"
		role="menuitem">
		{l.text}
	</a>
{/each}

<div class="flex justify-center space-x-4 py-4">
	<ClaimCart />
	<Cart />
	<AddActivity />
</div>

<div class="my-4 flex flex-col space-y-5 px-4 sm:my-4 sm:px-6">
	{#if $page.data.user.isAuthenticated}
		<MobileUsersProfile darkMode={true} />
	{:else}
		<StandardLink rel="external" href="/login/">Log in</StandardLink>
	{/if}
</div>
