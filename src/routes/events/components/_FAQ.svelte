<script>
  import FAQS from '../../../components/faq/_FAQs.svelte';

  const faqs = [
    {
      q: 'Why are you charging?',
      a:
        'Each user is charged a fee to access THAT Online events. The cost goes towards the running of the events along with the utilities and maintenance of the system.',
    },
    {
      q: 'Why do you offer a membership?',
      a:
        "A membership allows you to access all online monthly events throughout the year for a one time annual fee. You don't need to worry about purchasing each individual online event. You will have the freedom to access the information as you choose without the worry of remembering to purchase each month.",
    },
    {
      q: 'Can I buy on behalf of someone else?',
      a:
        'Unfortunately, this option is not available at this time but we are working on it.',
    },
    {
      q: 'Can I buy bulk tickets?',
      a:
        'Sorta. This is a feature in progress but email us @ hello@that.us and we will handle it manually.',
    },
    {
      q: 'Can I transfer my membership or ticket?',
      a: 'Unfortunately, this capability is not available at this time.',
    },
    {
      q: 'Can I cancel my annual membership?',
      a:
        'Yes, but we will miss you. You can cancel your annual membership at any time by heading to  https://that.us/my/settings/order-history. After cancelling your membership, you will still have access to THAT.us until the last day of your billing cycle. You will not receive a pro-rated refund for the remainder of your billing cycle.',
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
