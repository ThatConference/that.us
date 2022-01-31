<script>
	import lodash from 'lodash';
	import Headroom from 'svelte-headroom';

	import { session } from '$app/stores';
	import CreateProfileNotification from '$components/notifications/CreateProfile.svelte';

	import DesktopNav from './Desktop.svelte';
	import MobileNav from './Mobile.svelte';

	let hidden = true;

	const { isEmpty } = lodash;
</script>

<Headroom
	offset={30}
	on:unpin={() => {
		if (!hidden) hidden = !hidden;
	}}
>
	<div class="bg-white">
		{#if $session.isAuthenticated}
			{#if isEmpty($session.thatProfile)}
				<CreateProfileNotification />
			{/if}
		{/if}
		<div class="max-w-screen-xl mx-auto relative bg-white py-6 px-4 sm:px-6 lg:px-8">
			<div
				class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-10"
				class:hidden
				class:block={!hidden}
			>
				<div class="rounded-lg shadow-md">
					<div
						class="rounded-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="main-menu"
					>
						<div class="px-5 pt-4 flex items-center justify-between">
							<div>
								<img class="h-8 w-auto" src="/images/THAT-Full-Wide.svg" alt="THAT Logo" />
							</div>
							<div class="-mr-2">
								<button
									type="button"
									class="inline-flex items-center justify-center p-2 rounded-md
                    text-gray-400 hover:text-gray-500 hover:bg-gray-100
                    focus:outline-none focus:bg-gray-100 focus:text-gray-500
                    transition duration-150 ease-in-out"
									aria-label="Close menu"
									on:click|preventDefault={() => (hidden = !hidden)}
								>
									<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div class="px-2 pt-2 pb-3">
							<MobileNav />
						</div>
					</div>
				</div>
			</div>
			<nav class="relative flex items-center justify-between sm:h-10 lg:justify-start">
				<div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
					<div class="flex items-center justify-between w-full lg:w-auto">
						<a sveltekit:prefetch href="/" aria-label="Home">
							<img class="h-8 w-auto sm:h-10" src="/images/THAT-Full-Wide.svg" alt="THAT Logo" />
						</a>
						<div class="-mr-2 flex items-center lg:hidden">
							<button
								type="button"
								class="inline-flex items-center justify-center p-2 rounded-md
                  text-gray-400 hover:text-gray-500 hover:bg-gray-100
                  focus:outline-none focus:bg-gray-100 focus:text-gray-500
                  transition duration-150 ease-in-out"
								id="main-menu"
								aria-label="Main menu"
								aria-haspopup="true"
								on:click|preventDefault={() => (hidden = !hidden)}
							>
								<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div class="lg:w-full">
					<DesktopNav />
				</div>
			</nav>
		</div>
	</div>
</Headroom>
