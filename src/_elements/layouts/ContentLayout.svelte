<script>
	import { fade } from 'svelte/transition';

	import { Trees } from '../svgs';
	import Footer from '$components/footer/Footer.svelte';
	import NavWrapper from './_NavWrapper.svelte';
</script>

<section class="flex min-h-screen flex-col">
	<NavWrapper />
	<main class="flex-grow">
		<div class="inset-y-0 hidden h-full w-full lg:block">
			<div class="invisible lg:visible" in:fade={{ delay: 200, duration: 2000 }}>
				<Trees
					classes="opacity-25 fixed w-4/6 h-5/6 -right-48 -top-52 bottom-4/12 left-5/12 text-thatBlue-100" />
			</div>
		</div>
		<slot />
	</main>
	<Footer />
</section>
