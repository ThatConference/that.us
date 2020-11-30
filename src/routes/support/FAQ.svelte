<script>
  import Fuse from 'fuse.js';

  import Layout from '../../elements/layouts/ContentLayout.svelte';
  import FaqItems from '../../components/faq/FaqItem.svelte';
  import items from './faqItems.json';
  import metaTagsStore from '../../store/metaTags';

  metaTagsStore.set({
    title: 'FAQ - THAT',
    description: 'A common list of frequently asked questions, answered.',
    openGraph: {
      type: 'website',
      url: `https://that.us/support/faq`,
    },
  });

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
    keys: ['question', 'answer'],
  };

  let searchterm = '';
  let itemsFound;
  const fuse = new Fuse(items, options);

  function filter(term) {
    if (term === '') {
      itemsFound = items;
      return;
    }

    itemsFound = fuse.search(term).map(r => ({
      question: r.item.question,
      answer: r.item.answer,
      category: r.item.category,
    }));
  }

  filter(searchterm);
</script>

<Layout>
  <div class="py-16 overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-base max-w-prose mx-auto lg:max-w-none">
        <div
          class="flex justify-between items-center flex-wrap sm:flex-nowrap
            flex-col md:flex-row"
        >
          <div>
            <p
              class="text-base leading-6 text-thatOrange-400 font-semibold
                tracking-wide uppercase"
            >
              Help && Support
            </p>
            <h1
              class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
                text-gray-900 sm:text-4xl sm:leading-10"
            >
              Frequently Asked Questions
            </h1>
          </div>

          <div class="border-gray-200">
            <input
              class="form-input"
              bind:value="{searchterm}"
              on:input="{filter(searchterm)}"
              placeholder="type to search..."
            />
          </div>
        </div>
      </div>
      <div>
        <FaqItems faqs="{itemsFound}" />
      </div>
    </div>
  </div>
</Layout>
