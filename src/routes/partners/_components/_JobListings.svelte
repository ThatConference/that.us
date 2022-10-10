<script>
	export let listings = [];

	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	import { page } from '$app/stores';
	import { truncate } from '$utils/truncate';

	const { jobType } = getContext('DROP_DOWN_KEY_VALUE_PAIRS');
	const { partner } = $page.params;
</script>

<section class="bg-white py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-thatBlue-800 sm:text-4xl">
					Career Opportunities
				</h2>
			</div>

			<div class="overflow-hidden bg-white bg-opacity-75 shadow sm:rounded-md">
				<ul class="divide-y divide-gray-200">
					{#each listings as listing}
						<li in:fade>
							<a href={`/partners/${partner}/jobs/${listing.slug}`} class="block hover:bg-gray-50">
								<div class="px-4 py-4 sm:px-6">
									<div class="flex items-center justify-between">
										<p class="truncate text-sm font-medium text-thatBlue-500">
											{listing.title}
										</p>
										<div class="ml-2 flex flex-shrink-0">
											<p
												class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
												{jobType.options.find((i) => i.value === listing.jobType).label}
											</p>
										</div>
									</div>
									<div class="mt-2 sm:flex sm:justify-between">
										<div class="sm:flex">
											<p class="flex text-sm text-gray-500">
												{truncate(listing.description, 25)} ...
											</p>
										</div>
										<div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
											</svg>
											<p>Click to learn more</p>
										</div>
									</div>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
