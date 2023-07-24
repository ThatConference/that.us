<script>
	import { useMachine } from '@xstate/svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config.public';
	import config from '$utils/config.public';
	import Seo from '$components/Seo.svelte';
	import { Logo } from '$elements';

	import pricingMachine from './_machines/pricing';

	import PricingCore from './_components/pricing/_PricingCore.svelte';
	import Layout from './_components/_Layout.svelte';
	import Hero from './_components/pricing/_Hero.svelte';
	import Quote from './_components/pricing/_Quote.svelte';
	import FAQs from './_components/pricing/_FAQs.svelte';
	import NotReady from './_components/pricing/_NotReady.svelte';

	const metaTags = ((
		title = 'Membership is a way to finacially support us while unlocking some extras.'
	) => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Become a member and save today',
			openGraph: {
				type: 'website',
				url: `https://that.us/membership/`
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
		<Hero
			event={$state.context.event}
			eventTicket={$state.context.eventTicket}
			membership={$state.context.membership} />

		<Quote />

		<Logo height="40" uri="/images/THAT-Logo-Words.svg" />

		<PricingCore
			eventTicket={$state.context.eventTicket}
			event={$state.context.event}
			membership={$state.context.membership} />

		<FAQs />
		<NotReady />
	</Layout>
{/if}
