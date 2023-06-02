<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import Hero from './_components/_Hero.svelte';
	import JobCard from './_components/_JobListCard.svelte';

	const metaTags = ((
		title = 'Find your next job from these great opportunities from our sponsors.'
	) => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: 'https://that.us/jobs'
			}
		})
	}))();

	// find partners with jobs and deduplicate them.
	const partnerLevelSort = ['PIONEER', 'EXPLORER', 'SCOUT', 'PATRON', 'CUB', 'MEDIA'];
	const partnerMap = new Map();
	data.events.forEach((event) =>
		event.partners.forEach((partner) => {
			if (partner?.jobListings?.length > 0) {
				partnerMap.set(partner.id, partner);
			}
		})
	);
	const jobList = [];
	partnerMap.forEach((p, partnerId) => {
		p.jobListings.forEach((job) => {
			jobList.push({
				partnerId,
				partnerSlug: p.slug,
				companyName: p.companyName,
				companyLogo: p.companyLogo,
				level: p.level,
				placement: p.placement,
				jobSlug: job.slug,
				title: job.title,
				description: job.description,
				experienceLevel: job.experienceLevel,
				internship: job.internship,
				jobType: job.jobType,
				relocationOffered: job.relocationOffered,
				remote: job.remote,
				datePosted: job.datePosted
			});
		});
	});
	// sort placement then level
	jobList
		.sort((a, b) => a.placement - b.placement)
		.sort((a, b) => partnerLevelSort.indexOf(a.level) - partnerLevelSort.indexOf(b.level));
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />
<Layout>
	<main class="overflow-hidden">
		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			<div class="mx-auto mt-32 max-w-screen-xl px-4 sm:px-6 xl:mt-40">
				<main>
					<Hero />

					<div class="mt-8">
						<ul class="flex flex-col space-y-12">
							{#each jobList as job}
								<li>
									<JobCard {job} />
								</li>
							{/each}
						</ul>
					</div>
				</main>
			</div>
		</div>
	</main>
</Layout>
