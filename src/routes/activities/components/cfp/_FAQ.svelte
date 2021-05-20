<script>
  const questions = [
    {
      q: 'Well, I messed up. Can I update my activity?',
      a:
        'Of course. Just head over to your profile image, and select the My Submissions menu option. Edit away, and if you need some assistance, please let us know.',
    },
    {
      q: 'Do you cover any travel expenses?',
      a:
        'We do not. We are a not-for-profit and have chosen to keep the ticket cost as affordable as possible to allow everyone an opportunity to attend.',
    },
    {
      q: 'I need help with my abstract or presentation?',
      a:
        'No problem. We host a session every Wednesday on THAT.us. Just join us.',
    },
    {
      q: 'Will this be recorded?',
      a:
        "It depends on the budget for the year. A recording is super expensive to do well, and if we're able to do so, we will ask you to sign a release form.",
    },
    {
      q: 'Do I need to book my own room?',
      a:
        "Yes, and don't delay. We will provide you a link and all of the necessary information to get lodging secured.",
    },
    {
      q: 'How do I get reimbursed for my room?',
      a:
        'We will work with the resort and magically apply the credit to your bill. You are responsible for any other expenses incurred. We reimburse the cost of a standard room rate.',
    },
    {
      q: 'Can my family come?',
      a:
        'Yes! Better yet, have them attend your activity. We will even provide you some complimentary tickets.',
    },
    {
      q: 'Is there a speaker dinner?',
      a:
        'No, but instead, we have a pig roast one night where everyone is invited, including families.',
    },
    {
      q: 'What does the room setup look like?',
      a: 'Square, tan walls, big screen, podium, with a lot of chairs.',
    },
    {
      q: 'Do I need to register? Do I get a ticket?',
      a:
        'Yes. If selected, we will provide you will the necessary information to get it all squared away.',
    },
    {
      q: 'I was selected to speak Online. Do I get an in-person ticket?',
      a:
        'No, you will receive a free ticket to the portion of the event you are speaking in. Online speakers will be given a free virtual ticket, and in-person speakers will be given that appropriate ticket.',
    },
    {
      q: 'Can I submit or speak at both, online and in-person.',
      a: 'Sure.',
    },
  ];
</script>

<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
  <div class="max-w-2xl lg:mx-auto text-center">
    <h2
      class="text-4xl font-extrabold tracking-tighter uppercase text-thatBlue-800">
      Frequently asked questions
    </h2>
  </div>

  <div>
    <p class="text-center pt-4 prose-lg text-gray-500">
      Have more questions? Just drop us an email or hit us up in the chat.
      <a
        href="mailto:hello@that.us?subject=Adding a new community to THAT.us"
        rel="noopener"
        target="_blank"
        class="text-thatOrange-400 hover:text-thatOrange-500 hover:underline"
        >hello@that.us</a
      >.
    </p>
  </div>

  <div class="mt-20">
    <dl
      class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10">
      {#each questions as q}
        <div>
          <dt class="font-semibold prose-lg text-gray-600">
            {q.q}
          </dt>
          <dd class="mt-3 prose-lg text-gray-500">
            {q.a}
          </dd>
        </div>
      {/each}
    </dl>
  </div>
</div>
