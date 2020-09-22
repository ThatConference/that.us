<script>
  import items from './items.json';
  import Fuse from 'fuse.js';

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
  let items2;
  const fuse = new Fuse(items, options);

  function filter(term) {
    if (term === '') {
      items2 = items;
      return;
    }
    items2 = fuse.search(term).map(r => ({
      question: r.item.question,
      answer: r.item.answer,
      category: r.item.category,
    }));
    console.log(items2);
  }
  filter(searchterm);
</script>

<div class="mt-6 border-t-2 border-gray-200 pt-6">
  <span>Filter for:</span>
  <input
    class="form-input"
    bind:value="{searchterm}"
    on:input="{filter(searchterm)}"
  />
</div>
<div class="mt-6 border-t-2 border-gray-200 pt-6">
  <dl>

    {#each items2 as faq, i}
      {#if i === 0}
        <div class="md:grid md:grid-cols-12 md:gap-8">
          <dt
            class="text-base leading-6 font-medium text-gray-900 md:col-span-5"
          >
            {faq.question}
          </dt>

          <dd class="mt-2 md:mt-0 md:col-span-7">
            <p class="text-base leading-6 text-gray-500">
              {@html faq.answer}
            </p>
          </dd>
        </div>
      {:else}
        <div
          class="mt-8 border-t border-gray-200 pt-6 md:grid md:grid-cols-12
          md:gap-8"
        >
          <dt
            class="text-base leading-6 font-medium text-gray-900 md:col-span-5"
          >
            {faq.question}
          </dt>
          <dd class="mt-2 md:mt-0 md:col-span-7">
            <p class="text-base leading-6 text-gray-500">
              {@html faq.answer}
            </p>
          </dd>
        </div>
      {/if}
    {/each}

  </dl>
</div>

<style global>
  .faq-list {
    list-style-type: disc;
    list-style-position: inside;
  }
</style>
