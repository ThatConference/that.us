<script>
	export let job;

	import { getContext } from 'svelte';
	import { truncate } from '$utils/truncate';

	const { jobType, experienceLevel } = getContext('DROP_DOWN_KEY_VALUE_PAIRS');
</script>

<a href={`/partners/${job.partnerSlug}/jobs/${job.jobSlug}`} class="block hover:bg-gray-200">
	<div class=" px-4 py-4 sm:px-6">
		<div class="flex flex-col sm:flex-row">
			<div class=" pr-4">
				<img
					class="lazyload mx-auto h-16 w-32 flex-shrink-0"
					alt="{job.companyName} logo"
					src={job.companyLogo} />
			</div>
			<div class="flex basis-3/4 flex-col ">
				<div>
					<p class="truncate text-sm font-medium text-thatBlue-500">{job.title}</p>
				</div>
				<div class="mt-2  sm:flex sm:justify-between">
					<div class="sm:flex">
						<p class="flex text-sm text-gray-500">
							{truncate(job.description, 25)} ...
						</p>
					</div>
				</div>
				<div class="mt-0 flex flex-col text-sm sm:mt-1 sm:flex-row sm:gap-0 md:gap-3">
					<p
						class="rounded-full bg-green-100 px-2 text-center text-xs font-semibold leading-5 text-green-800">
						{jobType.options.find((i) => i.value === job.jobType).label}
					</p>
					<p
						class="rounded-full bg-blue-100 px-2 text-center text-xs font-semibold leading-5 text-blue-800">
						{experienceLevel.options.find((i) => i.value === job.experienceLevel)?.label}
					</p>
					{#if job.remote}
						<p
							class="rounded-full bg-yellow-100 px-2 text-center text-xs font-semibold leading-5 text-yellow-800">
							Remote
						</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</a>
