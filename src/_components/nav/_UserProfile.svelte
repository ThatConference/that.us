<script>
	import { session } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { user as userIcon } from '$components/svelte-awesome-icons';
	import Icon from 'svelte-awesome';
	import lodash from 'lodash';
	import { clickOutside } from '$elements/actions';

	const { isEmpty } = lodash;
	let visible;
</script>

<div class="relative">
	<div>
		<button
			id="user-menu"
			class="max-w-xs h-10 w-10 flex items-center justify-center text-sm rounded-full duration-150 ease-in-out"
			class:shadow-solid={visible}
			aria-label="User menu"
			aria-haspopup="true"
			on:click|preventDefault={() => (visible = !visible)}
		>
			{#if $session.isAuthenticated}
				{#if isEmpty($session.thatProfile)}
					<div>
						<Icon data={userIcon} class="h-8 w-8 rounded-full" />
						<span class="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-red-400" />
					</div>
				{:else if $session.thatProfile?.profileImage}
					<img
						class="h-10 w-10 rounded-full"
						src="{$session.thatProfile.profileImage}?w=256&h=256&fit=crop"
						alt=""
					/>
				{:else}
					<Icon data={userIcon} class="h-8 w-8 rounded-full" />
				{/if}
			{:else}
				<div class="transition duration-500 ease-in-out transform hover:scale-105">
					<Icon data={userIcon} class="h-8 w-8 rounded-full" />
				</div>
			{/if}
		</button>
	</div>

	{#if visible}
		<div use:clickOutside on:click_outside={() => (visible = false)}>
			{#if $session.isAuthenticated}
				{#if isEmpty($session.thatProfile)}
					<div
						class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50"
						in:fade
					>
						<div class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
							<a
								href="/my/profiles/primary/"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								Create Profile
							</a>

							<a href="/logout/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Logout
							</a>
						</div>
					</div>
				{:else}
					<div
						class="on-top origin-top-right absolute right-0 mt-2 min-w-48 rounded-md shadow-lg"
						in:fade
					>
						<div class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
							<div class="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 border-b">
								<a href="/my/profiles/primary/" on:click={() => (visible = false)}>
									<p>{$session.thatProfile.firstName} {$session.thatProfile.lastName}</p>
									<p class="truncate pt-2">{$session.thatProfile.email}</p>
								</a>
							</div>

							<a
								href="/my/profiles/primary/"
								on:click={() => (visible = false)}
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								My Profiles
							</a>

							<a
								href="/my/settings/badges/"
								on:click={() => (visible = false)}
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								My Settings
							</a>

							<a
								href="/my/network/"
								on:click={() => (visible = false)}
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								My Network
							</a>

							<a
								href="/my/favorites/"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								My Favorites
							</a>

							<a
								href="/my/submissions/"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								My Submissions
							</a>

							<a href="/logout/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Logout
							</a>
						</div>
					</div>
				{/if}
			{:else}
				<div in:fade class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50">
					<div class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
						<a
							href="/login/"
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
						>
							Login
						</a>
						<a
							href="/api/auth/signup/"
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
						>
							Sign Up
						</a>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.on-top {
		z-index: 999;
	}
</style>
