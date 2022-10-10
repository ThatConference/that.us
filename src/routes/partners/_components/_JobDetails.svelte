<script>
	export let jobListing;

	import { getContext } from 'svelte';
	import { Standard as StandardLink } from '$elements/links';

	const { jobType, experienceLevel } = getContext('DROP_DOWN_KEY_VALUE_PAIRS');

	function getJobAttributes() {
		return [
			{
				key: 'Employment Term',
				value: jobType.options.find((i) => i.value === jobListing.jobType).label
			},
			{
				key: 'Experience Level',
				value: experienceLevel.options.find((i) => i.value === jobListing.experienceLevel).label
			},
			{
				key: 'Relocation Offered',
				value: jobListing.relocationOffered ? 'Yes' : 'No'
			},
			{
				key: 'Remote Friendly',
				value: jobListing.remote ? 'Yes' : 'No'
			}
		];
	}
</script>

<section>
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-thatBlue-800 sm:text-4xl">
					{jobListing.title}
				</h2>
			</div>

			<div class="leading-8 text-gray-800">
				<p class="lineBreaks prose-xl">{jobListing.description}</p>
			</div>

			<div class="flex flex-col items-start space-y-2">
				{#each getJobAttributes() as ja}
					<div class="flex space-x-2">
						<div>{ja.key}:</div>
						<div class="font-extrabold">
							{ja.value}
						</div>
					</div>
				{/each}
			</div>

			{#if jobListing.applyNowLink}
				<div class="flex items-end justify-end">
					<StandardLink>
						<a href={jobListing.applyNowLink}>Apply Now</a>
					</StandardLink>
				</div>
			{/if}
		</div>
	</div>
</section>
