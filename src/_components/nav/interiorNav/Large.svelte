<script>
	import { fade } from 'svelte/transition';
	import Icon from 'svelte-awesome';
	import { plus } from '$components/svelte-awesome-icons';

	import DesktopLink from './_DesktopLink.svelte';
	import UserProfile from '../UserProfile.svelte';
	import { clickOutside } from '$elements/actions';

	import Cart from '../Cart.svelte';
	import ClaimCart from '../ClaimCart.svelte';

	let helpVisible;
</script>

<div class="relative flex items-center">
	<div class="flex-shrink-0">
		<a data-sveltekit-prefetch href="/">
			<img class="h-10" src="/images/THAT-Full-Wide-White.svg" alt="THAT Logo" />
		</a>
	</div>

	<div class="hidden lg:block">
		<div class="ml-8 flex items-baseline">
			<a
				data-sveltekit-prefetch
				href="/activities/"
				class="ml-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300
					hover:bg-that-blue hover:text-white focus:bg-that-blue
					focus:text-white focus:outline-none">
				<DesktopLink>Upcoming Open Spaces</DesktopLink>
			</a>
			<a
				href="https://thatconference.com"
				class="ml-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300
          hover:bg-that-blue hover:text-white focus:bg-that-blue
          focus:text-white focus:outline-none">
				<DesktopLink>THAT Conference</DesktopLink>
			</a>

			<a
				data-sveltekit-prefetch
				href="/members/"
				class="ml-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300
          hover:bg-that-blue hover:text-white focus:bg-that-blue
          focus:text-white focus:outline-none">
				<DesktopLink>Members</DesktopLink>
			</a>

			<a
				data-sveltekit-prefetch
				href="/communities/"
				class="ml-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300
          hover:bg-that-blue hover:text-white focus:bg-that-blue
          focus:text-white focus:outline-none">
				<DesktopLink>Communities</DesktopLink>
			</a>

			<!-- <a
				data-sveltekit-prefetch
				href="/partners/"
				class="ml-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300
          hover:bg-that-blue hover:text-white focus:bg-that-blue
          focus:text-white focus:outline-none">
				<DesktopLink>Partners</DesktopLink>
			</a>

			<a
				data-sveltekit-prefetch
				href="/blog/"
				class="ml-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300
          hover:bg-that-blue hover:text-white focus:bg-that-blue
          focus:text-white focus:outline-none">
				<DesktopLink>Blog</DesktopLink>
			</a> -->

			<div>
				<button
					href="/help/"
					class="ml-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300
            hover:bg-that-blue hover:text-white focus:bg-that-blue
            focus:text-white focus:outline-none"
					on:click|preventDefault={() => (helpVisible = !helpVisible)}>
					<DesktopLink>Help</DesktopLink>
				</button>
				{#if helpVisible}
					<div use:clickOutside on:click_outside={() => (helpVisible = false)}>
						<div class="absolute z-50 ml-4 mt-2 w-64 rounded-md shadow-lg" in:fade>
							<div class="rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5">
								<a href="/support/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									Getting Started
								</a>
								<a
									href="/support/what-is-an-activity/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									What Is An Open Space
								</a>
								<a
									href="/support/joining-an-activity/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									How To Join An Open Space
								</a>
								<a
									href="/support/creating-an-activity/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									How To Create An Open Space
								</a>
								<a
									href="/support/staying-up-to-date/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									Staying Up To Date
								</a>
								<a
									href="/support/faq/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									FAQ
								</a>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<div class="hidden lg:block">
	<div class="ml-4 flex items-center justify-center md:ml-6">
		<div class="text-white">
			<ClaimCart />
		</div>
		<div class="text-white">
			<Cart />
		</div>

		<div class="flex items-center justify-center">
			<div class="ml-4 rounded-full p-1 text-white hover:bg-thatBlue-500">
				<a href="/activities/create/">
					<Icon data={plus} class="h-8 w-8" />
				</a>
			</div>
		</div>

		<div class="ml-4 rounded-full text-white hover:bg-thatBlue-500">
			<UserProfile />
		</div>
	</div>
</div>
