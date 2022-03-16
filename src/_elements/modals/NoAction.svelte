<script>
	import { fade } from 'svelte/transition';
	import Waiting from '../Waiting.svelte';

	export let title;
	export let text;
</script>

<div in:fade>
	<div
		class="fixed inset-0 z-50 overflow-y-auto overscroll-none pt-20 "
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true">
		<div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:p-10">
			<div class="fixed inset-0">
				<div class="absolute inset-0 bg-gray-500 opacity-75" />
			</div>

			<div
				class="transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4
		shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline">
				<div>
					<div class="mx-auto flex items-center justify-center">
						<Waiting />
					</div>
					<div class="mt-3 text-center sm:mt-5">
						<h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
							{title}
						</h3>
						<div class="mt-2">
							<p class="text-sm leading-5 text-gray-500">{text}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
