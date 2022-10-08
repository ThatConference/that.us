<script>
	import { getContext } from 'svelte';

	import MobileUsersProfile from '../MobileUsersProfile.svelte';
	import ClaimCart from '../ClaimCart.svelte';
	import Cart from '../Cart.svelte';
	import AddActivity from '../AddActivity.svelte';

	const mobileVisible = getContext('IS_Mobile_VIEW');
</script>

<div
	class="border-b border-gray-700 lg:hidden"
	class:hidden={!$mobileVisible}
	class:block={$mobileVisible}>
	<div class="px-2 py-3 sm:px-3">
		<a
			data-sveltekit-prefetch
			href="/events/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Events
		</a>
		<a
			data-sveltekit-prefetch
			href="/activities/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Activities
		</a>
		<a
			data-sveltekit-prefetch
			href="/members/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Members
		</a>
		<a
			data-sveltekit-prefetch
			href="/communities/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
				hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
				focus:outline-none">
			Communities
		</a>
		<a
			data-sveltekit-prefetch
			href="/partners/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Partners
		</a>
		<a
			data-sveltekit-prefetch
			href="/blog/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Blog
		</a>
		<a
			data-sveltekit-prefetch
			href="/support/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Help
		</a>
	</div>

	<div class="flex justify-center space-x-4 py-4 text-white">
		<ClaimCart />
		<Cart />
		<AddActivity />
	</div>

	<MobileUsersProfile darkMode={false} />
</div>
