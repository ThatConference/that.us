<script>
	import { fade } from 'svelte/transition';

	import config from '$utils/config.public';
	import { Chevron } from '$elements/svgs';

	let imageCrop = '?auto=format&mask=ellipse&fit=crop&w=256&h=256&q=80';
</script>

<div in:fade={{ delay: 300, duration: 2000 }} class=" flex items-center">
	<div class="flex min-w-0 flex-1 items-center">
		<div in:fade={{ delay: 600, duration: 2000 }} class="flex-shrink-0 animate-pulse">
			<img
				class="h-12 w-12 animate-pulse rounded-full"
				src={`${config.defaultProfileImage}${imageCrop}`}
				alt="" />
		</div>
		<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
			<div in:fade={{ delay: 900, duration: 2000 }}>
				<div class="h-2 w-1/4 animate-pulse rounded bg-gray-200" />

				<p class="mt-2 flex items-center">
					<span class="h-2 w-1/2 animate-pulse rounded bg-gray-200" />
				</p>
			</div>

			<div in:fade={{ delay: 900, duration: 2000 }} class="hidden md:block">
				<div>
					<div class="h-2 w-3/4 animate-pulse rounded bg-gray-200" />

					<div class="mt-2 flex items-center  space-x-2">
						<div class="h-2 w-1/4 animate-pulse rounded bg-gray-200" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div>
		<Chevron />
	</div>
</div>
