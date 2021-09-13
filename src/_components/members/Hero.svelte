<script>
	import { getAuth } from '$utils/security';
	const { isAuthenticated, thatProfile } = getAuth();
</script>

<div class="sm:text-center lg:text-left">
	<h2
		class="text-4xl tracking-tight leading-10 font-extrabold text-thatBlue-800
      sm:text-5xl sm:leading-none md:text-6xl"
	>
		Welcome to
		<span class="text-thatOrange-400">THAT Family</span>
	</h2>

	<p
		class="mt-3 sm:mt-5 md:mt-5 sm:mx-auto lg:mx-0
    text-base text-gray-500  
    sm:text-lg md:text-xl
    sm:max-w-5xl"
	>
		At the heart of everything we do, you can find our THAT Community Geeks. We absolutely love our
		community of Geeks. Everyone brings a unique skill set and background that enriches our
		conversations and relationships. If you haven’t already signed up why wait any longer?
	</p>

	{#if !$isAuthenticated}
		<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
			<div class="rounded-md shadow">
				<a
					href="/membership/"
					class="w-full flex items-center justify-center px-8 py-3 border
            border-transparent text-base leading-6 font-medium rounded-md
            text-white bg-thatOrange-400 hover:bg-thatOrange-500
            focus:outline-none focus:border-thatOrange-700
            focus:ring-that-orange transition duration-150 ease-in-out
            md:py-4 md:text-lg md:px-10"
				>
					Sign up today!
				</a>
			</div>
		</div>
	{:else if !$thatProfile?.isMember}
		<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
			<div class="rounded-md shadow">
				<a
					href="/membership/"
					class="w-full flex items-center justify-center px-8 py-3 border
            border-transparent text-base leading-6 font-medium rounded-md
            text-white bg-thatOrange-400 hover:bg-thatOrange-500
            focus:outline-none focus:border-thatOrange-700
            focus:ring-that-orange transition duration-150 ease-in-out
            md:py-4 md:text-lg md:px-10"
				>
					Upgrade to for full access!
				</a>
			</div>
		</div>
	{/if}
</div>
