<script>
  export let eventType = 'DAILY';

  import { Input } from 'sveltejs-forms';
</script>

<div class="px-4 sm:px-6">
  <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-6">
    <div class="sm:col-span-6">
      <label
        for="activity_title"
        class="block text-sm font-medium text-gray-700">
        Title
      </label>
      <div class="relative">
        <span
          class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
        ></span>
      </div>

      <div>
        <p class="mt-1 text-sm text-gray-400">
          Provide a distinguishing name explaining this activity.
        </p>
      </div>
      <div class="mt-4">
        <Input
          name="title"
          autofocus
          class="form-input block w-full sm:text-sm sm:leading-5 hover:border-gray-700" />
      </div>
    </div>

    <div class="sm:col-span-6">
      <label
        for="activity_short_description"
        class="block text-sm font-medium text-gray-700">
        Short Description
      </label>
      <div class="relative">
        <span
          class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
        ></span>
      </div>
      <div>
        <p class="mt-1 text-sm text-gray-400">
          TL;DR; let's cut right to it. What this activity all about?
        </p>
      </div>
      <div class="mt-4">
        <Input
          name="shortDescription"
          multiline
          rows="5"
          spellcheck="true"
          class="form-input block w-full sm:text-sm sm:leading-5 hover:border-gray-700" />
      </div>
    </div>

    <div
      class:hidden="{['DAILY', 'ONLINE'].includes(eventType)}"
      class="sm:col-span-6">
      <label
        for="activity_long_description"
        class="block text-sm font-medium text-gray-700">
        Full Description
      </label>
      <div class="relative">
        <span
          class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
        ></span>
      </div>
      <div>
        <p class="mt-1 text-sm text-gray-400">
          No holding back. Describe what this activity is all about and why
          people should attend.
        </p>
      </div>
      <div class="mt-4">
        <Input
          name="longDescription"
          multiline
          rows="10"
          spellcheck="true"
          class="form-input block w-full sm:text-sm sm:leading-5 hover:border-gray-700" />
      </div>
    </div>
  </div>
</div>
