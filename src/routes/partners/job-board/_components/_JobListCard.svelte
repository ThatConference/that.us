<script>
	export let job;

	import { getContext } from 'svelte';
	import { truncate } from '$utils/truncate';

	const { jobType, experienceLevel } = getContext('DROP_DOWN_KEY_VALUE_PAIRS');
</script>

<div
	class="transform rounded-md p-4 transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-100">
	<a href={`/partners/${job.partnerSlug}/jobs/${job.jobSlug}`}>
		<div class="flex flex-col items-center sm:flex-row sm:space-x-12">
			<div class="flex-shrink-0  pb-8 sm:pb-0">
				<img class="lazyload h-full w-48" alt="{job.companyName} logo" src={job.companyLogo} />
			</div>

			<div class="flex flex-col space-y-4">
				<div>
					<p class="text-lg font-medium text-thatBlue-500">{job.title}</p>
				</div>

				<div>
					<p class="text-sm text-gray-500">
						{truncate(job.description, 50)} ...
					</p>
				</div>

				<div
					class="flex flex-col space-x-0 space-y-2 text-sm sm:flex-row sm:space-x-4 sm:space-y-0">
					<p
						class="rounded-md bg-green-100 px-4 py-2 text-center text-xs font-semibold  text-green-800">
						{jobType.options.find((i) => i.value === job.jobType).label}
					</p>
					<p
						class="rounded-md bg-blue-100 px-4 py-2 text-center text-xs font-semibold text-blue-800">
						{experienceLevel.options.find((i) => i.value === job.experienceLevel)?.label}
					</p>
					{#if job.remote}
						<p
							class="rounded-md bg-yellow-100 px-4 py-2 text-center text-xs font-semibold text-yellow-800">
							Remote
						</p>
					{/if}
				</div>
			</div>
			<div class="hidden w-48 sm:block">
				<svg
					class="h-10 w-10 text-gray-300"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd" />
				</svg>
			</div>
		</div>
	</a>
</div>
