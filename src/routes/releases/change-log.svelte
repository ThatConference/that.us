<script>
	import archieml from 'archieml';

	import seoMetaTags from '$utils/seo/metaTags';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import ReleaseNote from '$components/releaseNotes/Release.svelte';

	const metaTags = seoMetaTags({
		title: 'Changelog - THAT',
		description: 'Check out all of the releases.',
		openGraph: {
			type: 'website',
			url: `https://that.us/changelog`
		}
	});

	let getReleases = fetch('_releaseNotes/manifest.aml')
		.then((response) => response.text())
		.then((r) => {
			const { releases } = archieml.load(r);
			releases.reverse();
			return releases;
		});
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<Layout>
	<div class="py-16 bg-white">
		<div class="relative">
			{#await getReleases then results}
				{#each results as release}
					<div class="mb-20">
						<ReleaseNote releaseNotes={`_releaseNotes/${release}.aml`} />
					</div>
				{/each}
			{/await}
		</div>
	</div>
</Layout>
