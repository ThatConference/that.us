<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	const returnTo = $page.url.searchParams.has('returnTo')
		? $page.url.searchParams.get('returnTo')
		: '/';

	onMount(() => {
		invalidateAll();
	});
</script>

<div
	class="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-0 sm:flex
  sm:items-center sm:justify-center">
	<div class="fixed inset-0 transition-opacity">
		<div class="absolute inset-0 bg-gray-500 opacity-75" />
	</div>

	<div
		class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4
    shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-headline">
		<div class="sm:flex sm:items-start">
			<div
				class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center
        rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
				<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732
            4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>
			<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
				<h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
					Login Required
				</h3>
				<div class="mt-2">
					<p class="text-sm leading-5 text-gray-500">
						THAT part of the website requires you to be logged in. Please login or signup today.
						Please note you will be redirected to https://auth.that.tech to login.
					</p>
				</div>
			</div>
		</div>
		<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
			<span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
				<a
					href={`/login/?returnTo=${returnTo}`}
					rel="external"
					class="focus:ring-red inline-flex w-full justify-center rounded-md
         			border border-transparent bg-red-600 px-4 py-2 text-base
          			font-medium leading-6 text-white shadow-sm transition
          		duration-150 ease-in-out hover:bg-red-500 focus:border-red-700
          		focus:outline-none sm:text-sm sm:leading-5">
					Login
				</a>
			</span>
			<span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
				<a
					href="/signup/"
					class="focus:ring-blue inline-flex w-full justify-center rounded-md
						border border-gray-300 bg-white px-4 py-2 text-base font-medium
						leading-6 text-gray-700 shadow-sm transition
						duration-150 ease-in-out hover:text-gray-500
						focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5">
					Signup
				</a>
			</span>
		</div>
	</div>
</div>
