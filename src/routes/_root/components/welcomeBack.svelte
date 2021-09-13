<script>
	import { getAuth } from '$utils/security';

	const { thatProfile } = getAuth();
</script>

<section class="py-12 lg:py-16 bg-white">
	<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
		<h1 class="text-4xl tracking-tight font-extrabold text-thatBlue-800 sm:text-5xl md:text-6xl">
			Welcome back,
			<span class="pl-2 text-that-orange">{$thatProfile.firstName}!</span>
		</h1>
	</div>
</section>
