<script>
	import { fade } from 'svelte/transition';

	import { Trees } from '$elements/svgs';
	import Footer from '$components/footer/Footer.svelte';
	import Nav from '$components/nav/thatConference/Nav.svelte';
</script>

<div>
	<div class="flex min-h-screen flex-col">
		<div class="z-50">
			<Nav />
		</div>

		<div class="hidden lg:inset-y-0 lg:block lg:h-full lg:w-full">
			<div class="invisible lg:visible" in:fade={{ delay: 200, duration: 2000 }}>
				<Trees
					classes="z-0 opacity-25 fixed w-4/6 h-5/6 -right-48 -top-52 bottom-4/12 left-5/12 text-thatBlue-100" />
			</div>
		</div>

		<main class="flex-grow pt-36">
			<slot />
		</main>

		<Footer />
	</div>
</div>
