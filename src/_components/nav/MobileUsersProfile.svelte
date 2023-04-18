<script>
	export let darkMode = false;

	import { page } from '$app/stores';
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
			href: '/my/notification-preferences/',
			text: 'My Notification Preferences'
		},
		{
			href: '/my/settings/',
			text: 'Orders, Tickets, Membership'
		},

		{
			href: '/logout/',
			text: 'Logout',
			rel: 'external'
		}
	];
</script>

<div class="border-grey-400 border-t pb-3">
	{#if $page.data.user.isAuthenticated}
		<div class="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
			<div class="-m-3 flex items-start p-3">
				<div
					class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-that-orange">
					{#if isEmpty($page.data.user.profile) || !$page.data.user.profile.profileImage}
						<Icon data={userIcon} class="h-8 w-8 rounded-full bg-that-orange text-white" />
					{:else}
						<img
							class="h-12 w-12 rounded-full"
							src="{$page.data.user.profile.profileImage}?w=256&h=256&fit=crop"
							alt="" />
					{/if}
				</div>
				<div class="ml-4">
					{#if !isEmpty($page.data.user.profile)}
						<p class="text-base font-medium text-white" class:text-gray-800={darkMode}>
							{$page.data.user.profile.firstName}
							{$page.data.user.profile.lastName}
						</p>
						<p class="text-sm text-gray-300">
							{$page.data.user.profile.email}
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<div class="px-2">
		{#if $page.data.user.isAuthenticated}
			{#if isEmpty($page.data.user.profile)}
				<a
					href="/my/profiles/primary/"
					class="block rounded-md px-3 pb-2 text-base font-medium
           hover:bg-that-blue focus:bg-that-blue focus:text-white focus:outline-none">
					<span class="text-gray-300 hover:text-white" class:text-gray-800={darkMode}>
						Create Profile
					</span>
				</a>
				<a
					rel="external"
					href="/logout/"
					class="mt-1 block rounded-md px-3 py-2 text-base font-medium hover:bg-that-blue
            focus:bg-that-blue focus:text-white focus:outline-none">
					<span class="text-gray-300 hover:text-white" class:text-gray-800={darkMode}>
						Logout
					</span>
				</a>
			{:else}
				<div class="flex flex-col space-y-2">
					{#each loggedInMenuItems as { rel, href, text }}
						<a {rel} {href}>
							<div
								class="flex rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white focus:outline-none"
								class:text-gray-800={darkMode}>
								{text}
							</div>
						</a>
					{/each}
				</div>
			{/if}
		{:else}
			<div class="flex flex-row">
				<a
					rel="external"
					href="/login/"
					class="mb-1 mr-1 mt-4 block w-full flex-grow rounded-md bg-white py-2 text-center text-sm font-semibold text-that-blue">
					Login
				</a>
				<a
					rel="external"
					href="/login/"
					class="mb-1 ml-1 mt-4 block w-full flex-grow rounded-md bg-that-orange py-2 text-center text-sm font-semibold text-white">
					Sign Up
				</a>
			</div>
		{/if}
	</div>
</div>
