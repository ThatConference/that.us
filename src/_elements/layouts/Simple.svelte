<script>
	import { Footer } from '$components';
	import MainNav from '$components/nav/mainNav/MainNav.svelte';
</script>

<main>
	<div class="mx-auto max-w-screen-xl">
		<nav>
			<MainNav />
		</nav>
		<section class="px-4 pt-6 sm:px-6 lg:px-8">
			<slot />
		</section>
	</div>
	<Footer />
</main>
