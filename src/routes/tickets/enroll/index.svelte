<script context="module">
	export async function load({ url, stuff, fetch }) {
		return {
			props: {
				...stuff
			}
		};
	}
</script>

<script>
	export let event;
	export let eventSlug;

	import { fade } from 'svelte/transition';
	import { useMachine } from 'xstate-svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';
	import Seo from '$components/Seo.svelte';
	import NewFeatureWarning from '$components/NewFeatureWarning.svelte';

	import Hero from '../_components/Hero.svelte';
	import Loading from '../_components/Loading.svelte';
	import SectionHeader from '../_components/SectionHeader.svelte';
	import Steps from '../_components/steps.svelte';

	import ticketEnrollmentMachine from '../_machine';

	const metaTags = ((title = 'Ticket Enrollment - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/tickets/enroll`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	const { state, send } = useMachine(ticketEnrollmentMachine({ eventSlug }), {
		devTools: debug.xstate
	});

	let popNewFeatureWarning = true;

	$: steps = [
		{
			id: 'accept',
			title: 'Accept your Invitation',
			completed: $state.context.completed.one
		},
		{
			id: 'select',
			title: 'Select your Tickets',
			completed: $state.context.completed.two
		},
		{
			id: 'tickets',
			title: 'Select Gear',
			completed: $state.context.completed.three
		},
		{
			id: 'next',
			title: 'Your Next Steps',
			completed: $state.context.completed.six
		},
		{
			id: 'complete',
			title: 'Completed',
			completed: $state.matches(['step_seven'])
		}
	];

	function pluckTitle(id) {
		return steps.find((i) => i.id === id).title;
	}

	function handleSubmit(event) {
		send('SUBMIT', event.detail);
		window.scrollTo(0, 0);
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<section class="mt-24">
	<Hero {event} />
</section>

<div class="mx-auto max-w-prose text-base lg:max-w-none">
	<h2 class="text-base font-semibold uppercase tracking-wide text-thatOrange-400">
		THAT Conference Ticket Enrollment
	</h2>
	{#if $state.matches(['step_one'])}
		<p
			class="mt-6 text-4xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
			Congratulations are in order!
		</p>

		<div class="mt-12">
			<p class="prose prose-lg text-gray-500">
				Congratulations are in order! We've selected you and your session as part of our event and
				you're officially a {event.name} Counselor.
			</p>
			<p class="prose prose-lg mt-4 text-gray-500">
				To accept your speaking session, you must complete this Counselor Enrollment process. It's
				here where we gather dietary requirements, shirt sizes and how we make sure you've made it
				safely to camp.
			</p>
		</div>
	{:else}
		<p
			class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900">
			Counselor Enrollment
		</p>
	{/if}
</div>

<!-- speaker acceptance -->
<div class="relative pb-12">
	<div class="grid grid-cols-1 gap-12 lg:grid-flow-col-dense lg:grid-cols-3">
		<aside class="relative lg:col-span-1 lg:col-start-3 ">
			<div class="sticky top-8">
				<Steps {steps} />
			</div>
		</aside>
		<div class="mt-8 space-y-6 lg:col-span-2 lg:col-start-1">
			<!-- <section class="space-y-24">
				{#if ['speaker_declined', 'init'].some($state.matches)}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<Loading>
							<SectionHeader slot="header" title="Loading ..." />
						</Loading>
					</div>
				{/if}

				{#if $state.matches(['step_one'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<AcceptInvitation
							platform={$state.context.acceptedSpeaker.platform}
							sessions={$state.context.acceptedSpeaker.sessions}
							{eventDetails}
							on:speaker-decline={handleSpeakerDecline}
							on:submit-step={handleSubmit}>
							<SectionHeader slot="header" stepNumber="1" title={pluckTitle('accept')} />
						</AcceptInvitation>
					</div>
				{/if}

				{#if $state.matches(['step_two'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<SelectTickets
							{eventDetails}
							platform={$state.context.acceptedSpeaker.platform}
							on:submit-step={handleSubmit}>
							<SectionHeader slot="header" stepNumber="2" title={pluckTitle('select')} />
						</SelectTickets>
					</div>
				{/if}

				{#if $state.matches(['step_three'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<SelectTicketDetails
							platform={$state.context.acceptedSpeaker.platform}
							orderId={$state.context.orderId}
							orderAllocations={$state.context.allocations}
							on:submit-step={handleSubmit}>
							<SectionHeader slot="header" stepNumber="3" title={pluckTitle('tickets')} />
						</SelectTicketDetails>
					</div>
				{/if}

				{#if $state.matches(['step_four'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<EmergencyContactInfo on:submit-step={handleSubmit}>
							<SectionHeader slot="header" stepNumber="4" title={pluckTitle('emergency')} />
						</EmergencyContactInfo>
					</div>
				{/if}
				{#if $state.matches(['step_five'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<CampsiteComps {eventDetails} on:submit-step={handleSubmit}>
							<SectionHeader slot="header" stepNumber="5" title={pluckTitle('campsite')} />
						</CampsiteComps>
					</div>
				{/if}

				{#if $state.matches(['step_six'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						{#if acceptedSpeaker.platform === 'AT_THAT'}
							<AtThatNextSteps {eventDetails} on:submit-step={handleSubmit}>
								<SectionHeader slot="header" stepNumber="6" title={pluckTitle('next')} />
							</AtThatNextSteps>
						{:else}
							<OnThatNextSteps on:submit-step={handleSubmit}>
								<SectionHeader slot="header" stepNumber="6" title={pluckTitle('next')} />
							</OnThatNextSteps>
						{/if}
					</div>
				{/if}

				{#if $state.matches(['step_seven'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<ThankYou>
							<SectionHeader slot="header" title={pluckTitle('complete')} />
						</ThankYou>
					</div>
				{/if}

				{#if $state.matches(['submit_failed'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<Failed>
							<SectionHeader slot="header" title="Remember when we said... Beta feature?" />
						</Failed>
					</div>
				{/if}
				{#if $state.matches(['no_sessions'])}
					<div in:fade={{ delay: 100, duration: 400 }}>
						<NoSessions>
							<SectionHeader slot="header" title="No Sessions Found" />
						</NoSessions>
					</div>
				{/if}
			</section> -->
		</div>
	</div>
</div>

{#if $state.matches(['step_one'])}
	{#if popNewFeatureWarning}
		<div>
			<NewFeatureWarning on:close={() => (popNewFeatureWarning = false)}>
				<div>
					<p class="prose prose-xl mt-6 text-gray-500">
						If you're seeing this box, that means we've rolled out something new that we're pretty
						excited about. Better yet, we hope you enjoy it and it makes your experience just a tick
						better.
					</p>
					<p class="prose prose-xl mt-6 text-gray-500">
						We're human, and that means there is a slight chance you might come across a bug. If you
						run into issues or have a question for some reason, just hit us up in the chat. We'd
						also love your feedback so we can improve.
					</p>
				</div>
			</NewFeatureWarning>
		</div>
	{/if}
{/if}
