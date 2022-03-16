<script>
	export let listings = [];

	import { fade } from 'svelte/transition';

	import { page } from '$app/stores';
	import { truncate } from '$utils/truncate';
	import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';

	const { partner } = $page.params;
	const { queryPartnerDropDownValues } = partnerQueryApi();
</script>

{#await queryPartnerDropDownValues() then dropDownValues}
	<section class="py-12 lg:py-16 bg-white">
		<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
			<div class="space-y-12">
				<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
					<h2
						class="text-3xl leading-9 font-extrabold text-thatBlue-800 tracking-tight sm:text-4xl">
						Career Opportunities
					</h2>
				</div>

				<div class="bg-white bg-opacity-75 shadow overflow-hidden sm:rounded-md">
					<ul class="divide-y divide-gray-200">
						{#each listings as listing}
							<li in:fade>
								<a
									href={`/partners/${partner}/jobs/${listing.slug}`}
									class="block hover:bg-gray-50">
									<div class="px-4 py-4 sm:px-6">
										<div class="flex items-center justify-between">
											<p class="text-sm font-medium text-thatBlue-500 truncate">
												{listing.title}
											</p>
											<div class="ml-2 flex-shrink-0 flex">
												<p
													class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{dropDownValues.jobType.options.find((i) => i.value === listing.jobType)
														.label}
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
													class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
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
{/await}
