<script>
	export let bodyBackgroundColor = 'bg-gray-100';

	import { fade } from 'svelte/transition';
	import { session } from '$app/stores';
	import lodash from 'lodash';

	import { Footer } from '$components';
	import CreateProfileNotification from '$components/notifications/CreateProfile.svelte';
	import NoProfile from '$components/notifications/NoProfile.svelte';
	import { Trees } from '../svgs';

	const { isEmpty } = lodash;
</script>

{#if $session.isAuthenticated}
	{#if isEmpty($session.thatProfile)}
		<CreateProfileNotification />
	{/if}
{/if}

<NoProfile />

<div class="flex min-h-screen flex-col bg-white ">
	<div class="relative bg-thatBlue-500 pt-10">
		<div
			class="absolute inset-x-0 left-1/2 flex w-full -translate-x-1/2 transform justify-center overflow-hidden lg:inset-y-0"
		>
			<div class="flex-grow bg-opacity-75 bg-gradient-to-r from-thatBlue-800 " />
			<div class="flex-grow bg-opacity-75 bg-gradient-to-l from-thatBlue-700" />
		</div>
		<div class="inset-y-0 hidden h-full w-full lg:block">
			<div class="invisible lg:visible" in:fade={{ delay: 200, duration: 2000 }}>
				<Trees
					classes="opacity-25 fixed w-4/6 h-5/6 -right-48 -top-52 bottom-4/12 left-5/12 text-thatBlue-100"
				/>
			</div>
		</div>
		<header class="relative pb-32">
			<slot name="header" />
		</header>
	</div>

	<div id="main" class="relative -mt-32 flex-grow">
		<div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
			<div id="content-block" class="{bodyBackgroundColor} rounded-lg px-5 py-6 shadow sm:px-6">
				<slot name="body" />
				<!-- default slot as fallback-->
				<slot />
			</div>
			<slot name="footer" />
		</div>
	</div>

	<Footer class="self-end" />
</div>
