<script>
	import { fade } from 'svelte/transition';

	import { Trees } from '../svgs';
	import Footer from '$components/footer/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<div class="relative z-10 bg-thatBlue-500 pt-10">
		<div
			class="absolute inset-x-0 left-1/2 flex w-full -translate-x-1/2 transform justify-center lg:inset-y-0">
			<div class="flex-grow bg-opacity-75 bg-gradient-to-r from-thatBlue-800 " />
			<div class="flex-grow bg-opacity-75 bg-gradient-to-l from-thatBlue-700" />
		</div>
		<nav class="relative">
			<slot name="nav" />
		</nav>
		<header>
			<slot name="header" />
		</header>
	</div>

	<div class="hidden lg:inset-y-0 lg:block lg:h-full lg:w-full">
		<div class="invisible lg:visible" in:fade={{ delay: 200, duration: 2000 }}>
			<Trees
				classes="z-0 opacity-25 fixed w-4/6 h-5/6 -right-48 -top-52 bottom-4/12 left-5/12 text-thatBlue-100" />
		</div>
	</div>

	<main class="flex-grow">
		<slot />
	</main>
	<Footer />
</div>
