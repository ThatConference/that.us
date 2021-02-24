<script>
  import ActivityType from './_ActivityType.svelte';
  const examples = [
    {
      title: 'Presentations',
      copy:
        'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
    },
    {
      title: 'Peer Reviews',
      copy:
        'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
    },
    {
      title: 'Q&A',
      copy:
        'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
    },
    {
      title: 'Social',
      copy:
        'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
    },
    {
      title: 'Panel Disccusion',
      copy:
        'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
    },
    {
      title: 'Open Space',
      copy:
        'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.',
    },
  ];
</script>

<div
  class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
  {#each examples as e}
    <div class="relative group bg-white p-6">
      <ActivityType {...e} />
    </div>
  {/each}
</div>
