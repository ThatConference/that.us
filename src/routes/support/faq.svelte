<script>
	import Fuse from 'fuse.js';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import FaqItems from '$components/faq/FaqItem.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import items from './_faqItems.json';

	const metaTags = ((title = 'FAQ - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'A common list of frequently asked questions, answered.',
			openGraph: {
				type: 'website',
				url: `https://that.us/support/faq`
			}
		})
	}))();

	// https://fusejs.io/api/options.html
	const options = {
		// isCaseSensitive: false,
		includeScore: true,
		//shouldSort: false,
		// includeMatches: false,
		findAllMatches: true,
		// minMatchCharLength: 1,
		// location: 0,
		threshold: 0.2,
		// distance: 100,
		// useExtendedSearch: false,
		ignoreLocation: true,
		// ignoreFieldNorm: false,
		keys: ['question', 'answer']
	};

	let searchterm = '';
	let itemsFound;
	const fuse = new Fuse(items, options);

	function filter(term) {
		if (term === '') {
			itemsFound = items;
			return;
		}

		itemsFound = fuse.search(term).map((r) => ({
			question: r.item.question,
			answer: r.item.answer,
			category: r.item.category
		}));
	}

	filter(searchterm);
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="overflow-hidden py-16">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-prose text-base lg:max-w-none">
				<div
					class="flex flex-col flex-wrap items-center justify-between
            sm:flex-nowrap md:flex-row"
				>
					<div>
						<p
							class="text-base font-semibold uppercase leading-6
                tracking-wide text-thatOrange-400"
						>
							Help && Support
						</p>
						<h1
							class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight
                text-gray-900 sm:text-4xl sm:leading-10"
						>
							Frequently Asked Questions
						</h1>
					</div>

					<div class="border-gray-200">
						<input
							class="form-input"
							bind:value={searchterm}
							on:input={filter(searchterm)}
							placeholder="type to search..."
						/>
					</div>
				</div>
			</div>
			<div>
				<FaqItems faqs={itemsFound} />
			</div>
		</div>
	</div>
</Layout>
