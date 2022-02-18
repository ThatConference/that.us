<script>
	import { fade } from 'svelte/transition';

	import Footer from '$components/footer/Footer.svelte';
	import NavWrapper from './_NavWrapper.svelte';
</script>

<section class="flex min-h-screen flex-col">
	<NavWrapper />
	<main class="flex-grow">
		<div class="hidden lg:inset-y-0 lg:block lg:h-full lg:w-full">
			<div class="invisible lg:visible" in:fade={{ delay: 200, duration: 2000 }}>
				<slot />
			</div>
		</div>
	</main>
	<Footer />
</section>
