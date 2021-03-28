<script>
  import { useMachine } from 'xstate-svelte';

  import { Logo } from '../../elements';
  import { debug } from '../../config';

  import Layout from './components/_Layout.svelte';
  import Hero from './components/pricing/_Hero.svelte';
  import Quote from './components/pricing/_Quote.svelte';
  import FAQs from './components/pricing/_FAQs.svelte';
  import NotReady from './components/pricing/_NotReady.svelte';
  import PricingCore from './components/pricing/_PricingCore.svelte';

  import pricingMachine from './machines/pricing';
  import config from '../../config';

  const { state } = useMachine(pricingMachine(config.eventId), {
    devTools: debug.xstate,
  });
</script>

{#if $state.matches('ready')}
  <Layout>
    <Hero
      eventTicket="{$state.context.eventTicket}"
      membership="{$state.context.membership}" />

    <Quote />

    <Logo height="40" uri="/images/THAT-Logo-Words.svg" />

    <PricingCore
      eventTicket="{$state.context.eventTicket}"
      membership="{$state.context.membership}" />

    <FAQs />
    <NotReady />
  </Layout>
{/if}
