<script>
	export let darkMode = false;

	import { session } from '$app/stores';
	import { user as userIcon } from '$components/svelte-awesome-icons';
	import Icon from 'svelte-awesome';
	import lodash from 'lodash';

	const { isEmpty } = lodash;
	const loggedInMenuItems = [
		{
			href: '/my/profiles/',
			text: 'My Profiles'
		},
		{
			href: '/my/settings/',
			text: 'My Settings'
		},
		{
			href: '/my/network/',
			text: 'My Network'
		},
		{
			href: '/my/submissions/',
			text: 'My Submissions'
		},
		{
			href: '/my/favorites/',
			text: 'My Favorites'
		},

		{
			href: '/logout/',
			text: 'Logout',
			rel: 'external'
		}
	];
</script>

<div class="pb-3 border-t border-thatBlue-400">
	{#if $session.isAuthenticated}
		<div class="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
			<div class="-m-3 p-3 flex items-start">
				<div
					class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-that-orange"
				>
					{#if isEmpty($session.thatProfile) || !$session.thatProfile.profileImage}
						<Icon data={userIcon} class="h-8 w-8 rounded-full text-white bg-that-orange" />
					{:else}
						<img
							class="h-12 w-12 rounded-full"
							src="{$session.thatProfile.profileImage}?w=256&h=256&fit=crop"
							alt=""
						/>
					{/if}
				</div>
				<div class="ml-4">
					{#if !isEmpty($session.thatProfile)}
						<p class="text-base font-medium text-white" class:text-gray-800={darkMode}>
							{$session.thatProfile.firstName}
							{$session.thatProfile.lastName}
						</p>
						<p class="text-sm text-gray-300">
							{$session.thatProfile.email}
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<div class="px-2">
		{#if $session.isAuthenticated}
			{#if isEmpty($session.thatProfile)}
				<a
					href="/my/profiles/primary/"
					class="block px-3 pb-2 rounded-md text-base font-medium
           hover:bg-that-blue focus:outline-none focus:text-white focus:bg-that-blue"
				>
					<span class="text-gray-300 hover:text-white" class:text-gray-800={darkMode}>
						Create Profile
					</span>
				</a>
				<a
					rel="external"
					href="/logout/"
					class="mt-1 block px-3 py-2 rounded-md text-base font-medium hover:bg-that-blue
            focus:outline-none focus:text-white focus:bg-that-blue"
				>
					<span class="text-gray-300 hover:text-white" class:text-gray-800={darkMode}>
						Logout
					</span>
				</a>
			{:else}
				<div class="flex flex-col space-y-2">
					{#each loggedInMenuItems as { rel, href, text }}
						<div
							class="flex px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-that-blue focus:outline-none focus:text-white focus:bg-that-blue"
							class:text-gray-800={darkMode}
						>
							<a {rel} {href}>{text}</a>
						</div>
					{/each}
				</div>
			{/if}
		{:else}
			<div class="flex flex-row">
				<a
					rel="external"
					href="/login/"
					class="mt-4 mb-1 mr-1 block w-full bg-white rounded-md py-2 text-sm font-semibold text-that-blue text-center flex-grow"
				>
					Login
				</a>
				<a
					rel="external"
					href="/login/"
					class="mt-4 mb-1 ml-1 block w-full bg-that-orange rounded-md py-2 text-sm font-semibold text-white text-center flex-grow"
				>
					Sign Up
				</a>
			</div>
		{/if}
	</div>
</div>
