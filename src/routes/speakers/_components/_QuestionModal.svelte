<script>
	import { fade } from 'svelte/transition';

	import { Check } from '$elements/svgs';

	export let title = 'Congratulations on being selected to speak at THAT Conference!';
</script>

<div in:fade>
	<div
		class="fixed z-50 inset-0 overscroll-none overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div class="block min-h-screen text-center pt-20">
			<div
				class="inline-block bg-white rounded-lg px-4 pt-5 pb-4 overflow-auto shadow-xl sm:max-w-xl sm:w-full sm:p-6"
			>
				<div>
					<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
						<Check />
					</div>

					<div class="mt-4 text-center sm:mt-5">
						<h1 class="px-12 text-xl leading-6 font-bold text-gray-900" id="modal-headline">
							{title}
						</h1>
						<div class="relative mt-2">
							<slot />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
