<script>
	import { useMachine } from 'xstate-svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';
	import config from '$utils/config';
	import Seo from '$components/Seo.svelte';
	import { Logo } from '$elements';

	import pricingMachine from './_machines/pricing';

	import PricingCore from './_components/pricing/_PricingCore.svelte';
	import Layout from './_components/_Layout.svelte';
	import Hero from './_components/pricing/_Hero.svelte';
	import Quote from './_components/pricing/_Quote.svelte';
	import FAQs from './_components/pricing/_FAQs.svelte';
	import NotReady from './_components/pricing/_NotReady.svelte';

	const metaTags = ((title = 'Membership Pricing - THAT') => ({
		title,
		tags: seoMetaTags({
			title: 'Membership Pricing - THAT',
			description: 'Become a member and save today',
			openGraph: {
				type: 'website',
				url: `https://that.us/membership/pricing`
			}
		})
	}))();

	const { state } = useMachine(pricingMachine(config.eventId), {
		devTools: debug.xstate
	});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if $state.matches('ready')}
	<Layout>
		<Hero eventTicket={$state.context.eventTicket} membership={$state.context.membership} />

		<Quote />

		<Logo height="40" uri="/images/THAT-Logo-Words.svg" />

		<PricingCore eventTicket={$state.context.eventTicket} membership={$state.context.membership} />

		<FAQs />
		<NotReady />
	</Layout>
{/if}
