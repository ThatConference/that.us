<script>
	import { fade } from 'svelte/transition';

	import { Check } from '$elements/svgs';

	export let title = 'Payment Received, Thank You!';
	export let text =
		'We have a few follow-up questions for you to answer. Not only does this help us to better service you, but we need your shirt size.';
</script>

<div in:fade>
	<div
		class="fixed inset-0 z-50 overflow-y-auto overscroll-none"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true">
		<div class="block min-h-screen pt-20 text-center">
			<div
				class="inline-block overflow-auto rounded-lg bg-white px-4 pt-5 pb-4 shadow-xl sm:w-full sm:max-w-xl sm:p-6">
				<div>
					<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
						<span class="text-green-500"><Check /></span>
					</div>

					<div class="mt-4 text-center sm:mt-5">
						<h1 class="text-xl font-bold leading-6 text-gray-900" id="modal-headline">
							{title}
						</h1>
						<div class="mt-2 px-4">
							<p class="text-md leading-5 text-gray-500">{text}</p>
						</div>
						<div class="relative mt-12">
							<slot />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
