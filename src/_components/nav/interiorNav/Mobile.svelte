<script>
	import { getContext } from 'svelte';
	import MobileUsersProfile from '../_MobileUsersProfile.svelte';

	const mobileVisible = getContext('IS_Mobile_VIEW');
</script>

<div
	class="border-b border-gray-700 lg:hidden"
	class:hidden={!$mobileVisible}
	class:block={$mobileVisible}>
	<div class="px-2 py-3 sm:px-3">
		<a
			sveltekit:prefetch
			href="/events/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Events
		</a>
		<a
			sveltekit:prefetch
			href="/activities/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Activities
		</a>
		<a
			sveltekit:prefetch
			href="/members/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Members
		</a>
		<a
			sveltekit:prefetch
			href="/communities/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
				hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
				focus:outline-none">
			Communities
		</a>
		<a
			sveltekit:prefetch
			href="/partners/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Partners
		</a>
		<a
			sveltekit:prefetch
			href="/blog/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Blog
		</a>
		<a
			sveltekit:prefetch
			href="/support/"
			class="mt-1 block rounded-md px-3 py-2 text-base font-medium text-gray-300
        hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white
        focus:outline-none">
			Help
		</a>
	</div>

	<MobileUsersProfile darkMode={false} />
</div>
