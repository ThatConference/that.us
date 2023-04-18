<script>
	export let ticketDetails;

	import { Check } from '$elements/svgs';
	import { Shell as StandardShell } from '$elements/buttons';
</script>

<div class="relative min-h-full w-full flex-grow rounded-lg shadow-lg">
	<div>
		<div class="absolute inset-0 rounded-lg border-t-2 border-thatOrange-500" />
		<div class="absolute inset-x-0 top-0 translate-y-px transform">
			<div class="flex -translate-y-1/2 transform justify-center">
				<span
					class="text-md inline-flex rounded-full bg-thatOrange-500 px-6 py-1 font-bold uppercase tracking-wider text-white">
					{ticketDetails.name}
				</span>
			</div>
		</div>
	</div>

	<div class="grid h-full grid-cols-1 grid-rows-2 rounded-lg bg-gray-100">
		<div class="flex-grow rounded-lg bg-white px-6 py-8 sm:p-10 sm:pb-6">
			<div>
				<p class="text-6xl font-extrabold">
					${ticketDetails.price}
				</p>
			</div>

			<div class="mt-5">
				<p class="text-lg text-gray-500">
					{ticketDetails.shortDescription}
				</p>
			</div>
		</div>

		<div class="flex flex-col justify-between">
			<div class="flex-grow px-6 pb-8 pt-6 sm:p-10 sm:pt-6">
				<ul>
					{#each ticketDetails.includes as item}
						<li class="flex">
							<div>
								<span class="text-green-500"><Check /></span>
							</div>
							<p class="ml-3 text-base text-gray-700">{item}</p>
						</li>
					{/each}
				</ul>
			</div>

			<div class="relative mt-2 p-4">
				<StandardShell>
					<button type="button" on:click class="w-full px-8 py-2 md:px-10"> Purchase </button>
				</StandardShell>
			</div>
		</div>
	</div>
</div>
