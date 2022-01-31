<script>
	import { getContext } from 'svelte';
	import MobileUsersProfile from '../_MobileUsersProfile.svelte';

	const mobileVisible = getContext('IS_Mobile_VIEW');
</script>

<div
	class="border-b border-gray-700 lg:hidden"
	class:hidden={!$mobileVisible}
	class:block={$mobileVisible}
>
	<div class="px-2 py-3 sm:px-3">
		<a
			sveltekit:prefetch
			href="/events/"
			class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
		>
			Events
		</a>
		<a
			sveltekit:prefetch
			href="/activities/"
			class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
		>
			Activities
		</a>
		<a
			sveltekit:prefetch
			href="/members/"
			class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
		>
			Members
		</a>
		<a
			sveltekit:prefetch
			href="/communities/"
			class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
				hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
				focus:bg-that-blue"
		>
			Communities
		</a>
		<a
			sveltekit:prefetch
			href="/partners/"
			class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
		>
			Partners
		</a>
		<a
			sveltekit:prefetch
			href="/blog/"
			class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
		>
			Blog
		</a>
		<a
			sveltekit:prefetch
			href="/support/"
			class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300
        hover:text-white hover:bg-that-blue focus:outline-none focus:text-white
        focus:bg-that-blue"
		>
			Help
		</a>
	</div>

	<MobileUsersProfile darkMode={false} />
</div>
