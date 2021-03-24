<script>
  import { fade } from 'svelte/transition';

  import Step from './_Step.svelte';

  const stepNames = [
    'Select a location.',
    'Describe the activity.',
    'Schedule a time.',
    'Submit activity.',
  ];
</script>

<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
  <h2 id="timeline-title" class="text-lg font-medium text-gray-900">
    Steps to Submit
  </h2>

  <div class="mt-6 flow-root">
    <ul class="-mb-8">
      {#each stepNames as name, index}
        <li in:fade="{{ delay: index * 200 }}">
          <Step
            title="{name}"
            completed="{false}"
            stepNumber="{index + 1}"
            isLastItem="{stepNames.length - 1 === index}" />
        </li>
      {/each}
    </ul>
  </div>
  <div class="mt-12">
    <slot name="actions" />
  </div>
</div>
