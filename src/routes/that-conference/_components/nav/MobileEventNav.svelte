<script>
	export let hidden;

	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$elements/actions';
	import { StandardShell } from '$elements/buttons';

	import MobileUsersProfile from '$components/nav/MobileUsersProfile.svelte';
	import NavLink from './components/navLink.svelte';

	const dispatch = createEventDispatcher();
</script>

<div
	use:clickOutside
	on:click_outside={() => dispatch('show', true)}
	class="relative bg-white py-6">
	<div class="mx-8 flex items-center justify-between">
		<!-- logo -->
		<div class="cursor">
			<img class="h-16" src="/images/ThatConferenceLogo.svg" alt="THAT Logo" />
		</div>

		<!-- button -->
		<div>
			{#if hidden}
				<button
					type="button"
					class="rounded-md p-2
					text-gray-600 transition duration-150 ease-in-out 
					hover:bg-gray-100 hover:text-gray-500
					focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
					on:click|preventDefault={() => dispatch('show', false)}>
					<svg class="h-10 w-12" stroke="currentColor" fill="none" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			{:else}
				<button
					type="button"
					class="rounded-md p-2
					text-gray-600 transition duration-150 ease-in-out 
					hover:bg-gray-100 hover:text-gray-500
					focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
					on:click|preventDefault={() => dispatch('show', true)}>
					<svg class="h-10 w-12" stroke="currentColor" fill="none" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			{/if}
		</div>
	</div>

	{#if !hidden}
		<div class="mx-4 mt-6 ">
			<div class=" border-t">
				<div class="flex w-full flex-col space-y-2 py-6 text-base font-medium">
					<NavLink href="/wi">Wisconsin</NavLink>
					<NavLink href="/tx">Texas</NavLink>
					<NavLink href="/partners">Sponsors</NavLink>
					<NavLink href="/support/travel">Travel</NavLink>
				</div>

				<div class="py-6">
					<div>
						{#if $page.data.user.isAuthenticated}
							<MobileUsersProfile darkMode={true} />
						{:else}
							<StandardShell>
								<div class="py-2 px-4">
									<a rel="external" href="/login/">Log in</a>
								</div>
							</StandardShell>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
