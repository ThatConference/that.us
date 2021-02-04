<script>
  import { useMachine } from 'xstate-svelte';

  import { debug } from '../../config';
  import currentEvent from '../../store/currentEvent';

  import Layout from './components/_Layout.svelte';
  import LogoCloud from './components/_LogoCloud.svelte';
  import Hero from './components/pricing/_Hero.svelte';
  import Quote from './components/pricing/_Quote.svelte';
  import FAQs from './components/pricing/_FAQs.svelte';
  import NotReady from './components/pricing/_NotReady.svelte';
  import PricingCore from './components/pricing/_PricingCore.svelte';

  import pricingMachine from './machines/pricing';

  const { state } = useMachine(pricingMachine($currentEvent.eventId), {
    devTools: debug.xstate,
  });
</script>

{#if $state.matches('ready')}
  <Layout>
    <Hero
      eventTicket="{$state.context.eventTicket}"
      membership="{$state.context.membership}"
    />
    <Quote />
    <PricingCore
      eventTicket="{$state.context.eventTicket}"
      membership="{$state.context.membership}"
    />
    <LogoCloud />
    <FAQs />
    <NotReady />
  </Layout>
{/if}
