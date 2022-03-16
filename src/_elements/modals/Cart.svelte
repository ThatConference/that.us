<script>
	import { fade } from 'svelte/transition';

	export let title;
	export let text;
</script>

<div
	class="fixed inset-x-0 bottom-0 z-10 px-4 pb-6 sm:inset-0 sm:flex sm:items-center
	sm:justify-center sm:p-0">
	<div class="fixed inset-0 transition-opacity">
		<div class="absolute inset-0 bg-gray-100 opacity-75" />
	</div>

	<div
		class="transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-headline"
		transition:fade={{ duration: 1000 }}>
		<div>
			<div class="mx-auto flex items-center justify-center p-12">
				<img src="/images/THATCart.svg" alt="" />
			</div>
			<div class="mt-4 text-center sm:mt-5">
				<h1 class="text-xl font-bold leading-6 text-gray-900" id="modal-headline">
					{title}
				</h1>
				<div class="mt-2">
					<p class="text-md leading-5 text-gray-500">{text}</p>
				</div>
				<div class="mt-6">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
