<script>
	import { page } from '$app/stores';
</script>

<div class="sm:text-center lg:text-left">
	<h2
		class="text-4xl font-extrabold leading-10 tracking-tight text-thatBlue-800
      sm:text-5xl sm:leading-none md:text-6xl">
		Welcome to
		<span class="text-thatOrange-400">THAT Family</span>
	</h2>

	<p
		class="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5
    sm:max-w-5xl sm:text-lg  
    md:mt-5 md:text-xl
    lg:mx-0">
		At the heart of everything we do, you can find our THAT Community Geeks. We absolutely love our
		community of Geeks. Everyone brings a unique skill set and background that enriches our
		conversations and relationships. If you haven’t already signed up why wait any longer?
	</p>

	{#if !$page.data.user.isAuthenticated}
		<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
			<div class="rounded-md shadow">
				<a
					href="/membership/"
					class="flex w-full items-center justify-center rounded-md border border-transparent
            bg-thatOrange-400 px-8 py-3 text-base font-medium
            leading-6 text-white transition
            duration-150 ease-in-out
            hover:bg-thatOrange-500 focus:border-thatOrange-700 focus:outline-none focus:ring-that-orange
            md:py-4 md:px-10 md:text-lg">
					Sign up today!
				</a>
			</div>
		</div>
	{:else if !$page.data.user.profile?.isMember}
		<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
			<div class="rounded-md shadow">
				<a
					href="/membership/"
					class="flex w-full items-center justify-center rounded-md border border-transparent
            bg-thatOrange-400 px-8 py-3 text-base font-medium
            leading-6 text-white transition
            duration-150 ease-in-out
            hover:bg-thatOrange-500 focus:border-thatOrange-700 focus:outline-none focus:ring-that-orange
            md:py-4 md:px-10 md:text-lg">
					Upgrade to for full access!
				</a>
			</div>
		</div>
	{/if}
</div>
