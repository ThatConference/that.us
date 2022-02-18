<script>
	import { session } from '$app/stores';
</script>

<section class="bg-white py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl md:text-6xl">
			Welcome back,
			<span class="pl-2 text-that-orange">{$session.thatProfile.firstName}!</span>
		</h1>
	</div>
</section>
