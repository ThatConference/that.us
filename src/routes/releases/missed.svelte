<script>
	import { onMount } from 'svelte';
	import archieml from 'archieml';
	import lodash from 'lodash';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import ReleaseNote from '$components/releaseNotes/Release.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import { showReleaseNotes } from '$stores/siteVersion';

	const { last } = lodash;

	const metaTags = ((title = 'Changelog - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: "This is what you've missed since your last visit.",
			openGraph: {
				type: 'website',
				url: `https://that.us/changelog-missed`
			}
		})
	}))();

	let versionLastSeen;

	let getReleases = fetch('_releaseNotes/manifest.aml')
		.then((response) => response.text())
		.then((r) => {
			const { releases } = archieml.load(r);

			let missedReleases = [];
			if (versionLastSeen) {
				missedReleases = releases.slice(releases.indexOf(versionLastSeen) + 1);
			} else {
				missedReleases = releases;
			}

			// has to be before we reverse it.
			if (missedReleases.length > 0)
				window.localStorage.setItem('versionLastSeen', last(missedReleases));

			missedReleases.reverse();
			showReleaseNotes.set(false);
			return missedReleases;
		});

	onMount(async () => {
		versionLastSeen = window.localStorage.getItem('versionLastSeen');
	});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="py-16 bg-white">
		<div class="relative max-w-7xl mx-auto">
			<div class="mb-12">
				<h3
					class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900
            sm:text-4xl sm:leading-10"
				>
					Since your last visit...
				</h3>
				<div>
					<a href="/changelog" class="pointer text-thatBlue-500 hover:text-thatBlue-900">
						Checkout our past releases.
					</a>
				</div>
			</div>

			{#await getReleases then results}
				{#if results.length > 0}
					{#each results as release}
						<div class="mb-20">
							<ReleaseNote releaseNotes={`_releaseNotes/${release}.aml`} />
						</div>
					{/each}
				{:else}
					<div>
						<p>You're all caught up!</p>
					</div>
				{/if}
			{/await}
		</div>
	</div>
</Layout>
