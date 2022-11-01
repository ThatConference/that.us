<script>
	import { browser } from '$app/environment';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	const metaTags = ((title = 'Contact Us') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Need a little help, contact us today.',
			openGraph: {
				url: `https://that.us/support/contact-us`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="overflow-hidden py-20">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<header>
				<h1
					class="pb-16 text-4xl font-extrabold leading-10 tracking-tight
          text-thatBlue-800 sm:text-center sm:text-5xl sm:leading-none
          md:text-6xl lg:text-left">
					Contact Us
				</h1>
			</header>

			<main>
				{#if browser}
					<script>
						hbspt.forms.create({
							region: 'na1',
							portalId: '22769624',
							formId: '64029085-6bf8-4359-8a21-ab241b25200a'
						});
					</script>
				{/if}
			</main>
		</div>
	</div>
</Layout>
