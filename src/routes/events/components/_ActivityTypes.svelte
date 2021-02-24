<script>
  import ActivityType from './_ActivityType.svelte';
  const examples = [
    {
      title: 'Presentations',
      copy:
        'The traditional session style, which an idea, product, or piece of work is shown and explained to an audience. Best when left ample time for Q&A.',
    },
    {
      title: 'Peer Reviews',
      copy:
        "A conversation centered on one's piece of work with others who have similar interests. This style is meant to be interactive with participants for all to help, learn, or understand the topic.",
    },
    {
      title: 'Q&A',
      copy:
        "A style in which a person or group of people ask questions and other's provide answers. This format is intended to be open ended along with inclusion of all opinions if an opinion style question is asked.",
    },
    {
      title: 'Open Space',
      copy:
        'An activity designed around discussing a topic or sharing an experience with others. This style is meant to be interactive with all participants interested in similar topics.',
    },
    {
      title: 'Panel Discusion',
      copy:
        'A style in which a group of people in a specific topic engage in conversation together in front of an audience.',
    },
    {
      title: 'Social',
      copy:
        'Get to know one another better by engaging everyone in conversation. Make sure to give everyone space to participate.',
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
