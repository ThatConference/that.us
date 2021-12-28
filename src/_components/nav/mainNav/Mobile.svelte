<script>
	import { session } from '$app/stores';
	import { Standard as StandardLink } from '$elements/links';

	import links from './links';
	import MobileUsersProfile from '../_MobileUsersProfile.svelte';
</script>

{#each links as l}
	<a
		href={l.href}
		class="block px-3 py-2 rounded-md text-base font-medium text-gray-700
    hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900
    focus:bg-gray-50 transition duration-150 ease-in-out"
		role="menuitem"
	>
		{l.text}
	</a>
{/each}

<div class="my-4 sm:my-4 px-4 sm:px-6 flex flex-col space-y-5">
	{#if $session.isAuthenticated}
		<MobileUsersProfile darkMode={true} />
	{:else}
		<StandardLink rel="external" href="/login/">Log in</StandardLink>
	{/if}
</div>
