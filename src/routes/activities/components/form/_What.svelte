<script>
  export let initialData;
  export let setField;

  import { Input } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import Tags from 'svelte-tags-input';
</script>

<div class="px-4 sm:px-6 py-5 ">
  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
    <label
      for="activity_title"
      class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2 col-span-1">
      What would you like to chat about?
    </label>

    <div class="mt-1 sm:mt-0 col-span-2">
      <div class="max-w-lg">
        <Input
          name="title"
          autofocus
          class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700" />
      </div>
    </div>
  </div>

  <div
    class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
    <label
      for="activity_shortDescription"
      class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      Explain a bit more about what you'd like to chat about.
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="max-w-lg">
        <Input
          name="shortDescription"
          multiline
          rows="5"
          spellcheck="true"
          class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700" />
      </div>
    </div>
  </div>

  <div
    class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
    <label
      for="activity_tags"
      class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
      Set 5 or less 'tags' to help categorize this chat. (return/enter is the
      delimiter)
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="max-w-lg tag-form-input">
        <Tags
          name="tags"
          tags="{initialData.tags}"
          on:tags="{({ detail }) => setField('tags', detail.tags)}"
          allowBlur="{true}"
          maxTags="{5}"
          onlyUnique="{true}"
          class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700" />
      </div>
    </div>
  </div>
</div>
