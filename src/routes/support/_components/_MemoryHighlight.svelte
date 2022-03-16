<script>
	export let imageSrc = '';
	import { fade } from 'svelte/transition';
</script>

<div in:fade={{ delay: 300, duration: 2000 }}>
	<div class="rounded-lg bg-thatBlue-800 pb-16 lg:relative lg:z-10 lg:pb-0">
		<div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-8 lg:px-8">
			<div class="relative lg:-my-8">
				<div aria-hidden="true" class="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
				<div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:h-full lg:p-0">
					<div
						class="aspect-w-10 aspect-h-6 overflow-hidden rounded-xl shadow-xl sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
						<img class="object-cover lg:h-full lg:w-full" src={imageSrc} alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
