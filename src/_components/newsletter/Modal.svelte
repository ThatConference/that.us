<script>
	import IntersectionObserver from '$components/IntersectionObserver.svelte';
	import { clickOutside } from '$elements/actions';

	import HubspotForm from './HubspotForm.svelte';

	let dismissed = false;
	let intersected = false;
</script>

<IntersectionObserver on:intersected={() => (intersected = true)} />

{#if !dismissed && intersected}
	<div>
		<div
			class="fixed inset-0 z-50 overflow-y-auto overscroll-none"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true">
			<div
				class="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:p-10 sm:text-left">
				<div class="fixed inset-0">
					<div class="absolute inset-0 bg-gray-800 opacity-75" />
				</div>

				<div
					use:clickOutside
					on:click_outside={() => (dismissed = true)}
					class="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div
						class="relative isolate flex flex-col gap-10 overflow-hidden bg-thatBlue-800 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:flex-row xl:items-center xl:py-32">
						<div class="space-y-4 text-white">
							<h2
								class="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl xl:max-w-none xl:flex-auto">
								Build your Network, <br />
								<span class="sm:pl-24">Grow your Career.</span>
							</h2>
							<p>
								Get the <span class="font-bold">5-minute newsletter</span> teaching tens of thousands
								how to grow their network and create the career they love in tech.
							</p>
						</div>

						<div class="w-2/3">
							<HubspotForm />
						</div>

						<svg
							viewBox="0 0 1024 1024"
							class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
							aria-hidden="true">
							<circle
								cx="512"
								cy="512"
								r="512"
								fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
								fill-opacity="0.7" />
							<defs>
								<radialGradient
									id="759c1415-0410-454c-8f7c-9a820de03641"
									cx="0"
									cy="0"
									r="1"
									gradientUnits="userSpaceOnUse"
									gradientTransform="translate(512 512) rotate(90) scale(512)">
									<stop stop-color="#7775D6" />
									<stop offset="1" stop-color="#E935C1" stop-opacity="0" />
								</radialGradient>
							</defs>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
