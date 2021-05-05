<script>
  export let touched, errors, setField;
  export let initialData;
  export let dropDownValues;

  import Select from 'svelte-select';

  const { targetAudience } = dropDownValues;

  let selectedtargetAudienceValue = initialData.targetAudience || undefined;
</script>

<div class="px-4 sm:px-6">
  <div class="mt-6 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-6">
    <div class="sm:col-span-6">
      <label
        for="activity_tags"
        class="block text-sm font-medium text-gray-700">
        Intended Audiences
      </label>
      <div class="relative">
        <span
          class="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 block h-2 w-2 rounded-full bg-red-400"
        ></span>
      </div>
      <div>
        <p class="mt-1 text-sm text-gray-400">
          You might not find a perfect fit, but please choose something that
          best applies.
        </p>
      </div>
      <div class="mt-4">
        <div class="w-full">
          <Select
            name="targetAudience"
            isMulti="{true}"
            inputAttributes="{{ name: 'targetAudience' }}"
            items="{targetAudience.options}"
            bind:selectedValue="{selectedtargetAudienceValue}"
            on:select="{({ detail }) =>
              setField(
                'targetAudience',
                detail ? detail.map(i => i.value) : [],
              )}"
            on:clear="{() => setField('targetAudience', [])}"
            hasError="{touched['targetAudience'] && errors['targetAudience']}"
            inputStyles="form-select relative block w-full
                bg-transparent focus:z-10 transition ease-in-out duration-150
                sm:text-sm sm:leading-5 rounded-md shadow-sm hover:border-gray-700" />
          {#if touched['targetAudience'] && errors['targetAudience']}
            <p class="text-red-600 italic">{errors['targetAudience']}</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
