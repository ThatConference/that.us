<script>
	import archieml from 'archieml';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import ReleaseNote from '$components/releaseNotes/Release.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	const metaTags = ((title = 'Changelog - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Check out all of the releases.',
			openGraph: {
				type: 'website',
				url: `https://that.us/releases/changelog/`
			}
		})
	}))();

	let getReleases = fetch('/_releaseNotes/manifest.aml')
		.then((response) => response.text())
		.then((r) => {
			const { releases } = archieml.load(r);
			releases.reverse();
			return releases;
		});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />
<Layout>
	<div class="py-16 bg-white">
		<div class="relative">
			{#await getReleases then results}
				{#each results as release}
					<div class="mb-20">
						<ReleaseNote releaseNotes={`/_releaseNotes/${release}.aml`} />
					</div>
				{/each}
			{/await}
		</div>
	</div>
</Layout>
