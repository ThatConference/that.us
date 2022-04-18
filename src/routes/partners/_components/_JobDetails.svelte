<script>
	export let jobListing;

	console.log({ jobListing });

	import partnerQueryApi from '$dataSources/api.that.tech/partner/queries';
	import { Standard as StandardLink } from '$elements/links';

	const { queryPartnerDropDownValues } = partnerQueryApi();

	function getJobAttributes(dropDownValues) {
		return [
			{
				key: 'Employment Term',
				value: dropDownValues.jobType.options.find((i) => i.value === jobListing.jobType).label
			},
			{
				key: 'Experience Level',
				value: dropDownValues.experienceLevel.options.find(
					(i) => i.value === jobListing.experienceLevel
				).label
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

			{#await queryPartnerDropDownValues() then dropDownValues}
				<div class="flex flex-col items-start space-y-2">
					{#each getJobAttributes(dropDownValues) as ja}
						<div class="flex space-x-2">
							<div>{ja.key}:</div>
							<div class="font-extrabold">
								{ja.value}
							</div>
						</div>
					{/each}
				</div>
			{/await}

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
