<script>
  import FAQS from '../../../components/faq/_FAQs.svelte';

  const faqs = [
    {
      q: 'Why are you charging?',
      a: 'xxx',
    },
    {
      q: 'Why do you offer a membership?',
      a: 'xxx',
    },
    {
      q: 'Can I buy on behalf of someone else?',
      a: 'xxx',
    },
    {
      q: 'Can I buy bulk tickets?',
      a:
        'Sorta. This is a feature in progress but email us @ hello@that.us and we will handle it manually.',
    },
    {
      q: 'Can I transfer my membership or ticket?',
      a: 'Not at this time.',
    },
    {
      q: "I'm interested in becoming a sponsor.",
      a: "That's wonderful to hear. Please contact us at partnerships@that.us.",
    },
  ];
</script>

<div class="">
  <FAQS faqs="{faqs}" />
</div>
