<script>
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import HubspotForm from '$components/newsletter/HubspotForm.svelte';

	const metaTags = ((title = 'Create your THAT account and profile today and get involved.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'aafsdfa.',
			openGraph: {
				url: `https://that.us/newsletter/what-now`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="pb-20">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
				<div
					class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
					<h1
						class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
						Build your network, grow your career.
					</h1>
					<div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
						<p class="text-lg leading-8 text-gray-600">
							Get the 5-minute newsletter teaching tens of thousands how to grow their network and
							create the career they love in tech.
						</p>
						<div class="mt-10">
							<HubspotForm />
						</div>
					</div>
					<img
						src="/images/characters/moose_with_lantern.png"
						alt=""
						class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-contain sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36" />
				</div>
			</div>
		</div>
	</div>
</Layout>
