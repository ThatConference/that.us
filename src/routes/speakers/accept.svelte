<script>
	import { onMount } from 'svelte';

	import seoMetaTags from '$utils/seo/metaTags';
	import { getAuth } from '$utils/security';
	import Seo from '$components/Seo.svelte';
	import { Highlight as HighlightLink, Standard as StandardLink } from '$elements/links';

	import Layout from './_components/_Layout.svelte';
	import QuestionModal from './_components/_QuestionModal.svelte';

	const { thatProfile } = getAuth();
	const metaTags = ((title = 'Speaker Acceptance - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://that.us/speakers/accept`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	$: questionsCompleted = false;
	let formDataPrefill;

	onMount(() => {
		const [_, queryString] = window.location.search.split('?');
		formDataPrefill = `memberId=${$thatProfile.id}&memberEmail=${$thatProfile.email}&firstName=${$thatProfile.firstName}&lastName=${$thatProfile.lastName}&${queryString}`;
	});

	function handleOnSubmit(e) {
		questionsCompleted = true;
	}

	function handleOnLoad() {
		window.addEventListener('PaperformSubmission', handleOnSubmit);
	}
</script>

<svelte:head>
	<script src="https://paperform.co/__embed.min.js" on:load={handleOnLoad}>
	</script>
</svelte:head>

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if !questionsCompleted}
	<div class="overscroll-none">
		<div class="z-50 fixed inset-0 min-h-screen min-w-screen bg-gray-500 opacity-75" />
		<QuestionModal>
			<div class="h-full w-full" data-prefill={formDataPrefill} data-paperform-id="yr2byvxg" />
		</QuestionModal>
	</div>
{/if}

<Layout>
	<div class="space-y-12">
		<div class="text-base max-w-prose mx-auto lg:max-w-none">
			<h2 class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase">
				Counselor Acceptance
			</h2>
			<p
				class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900"
			>
				Congratulations are in order!
			</p>
		</div>

		<div class="relative">
			<div class="prose text-lg text-gray-500 mx-auto lg:max-w-none">
				<p>
					Our passion is people, communities, and helping one another become a better geek than they
					were yesterday. We honored to have you join us.
					<span class="font-bold">Thank You!</span>
				</p>

				<p>What's next?</p>

				<ul>
					<li>If you're speaking in-person, reserve your room ASAP.</li>
					<li>
						<a href="/my/profiles/primary">Review and update your profile.</a>
					</li>

					<li>
						If you've requested some help in preparing, an email will be arriving soon with more
						details.
					</li>

					<li>
						We will send you a link to a few slides to include in your presentation, thanking our
						sponsors.
					</li>

					<li>
						Join in now! Better yet, go create an activity. <a href="/support/"
							>Learn how to get started.</a
						>
					</li>
					<li>
						<a href="https://thatslack.thatconference.com">Join us in Slack.</a>
					</li>
					<li>
						Keep up to date. <a href="/support/staying-up-to-date">Subscribe to the calendar.</a>
						>
					</li>
					<li>
						Get ready for what's coming. <a href="/events"
							>Check out our past and upcoming events.</a
						>
					</li>
				</ul>

				<div class="mt-12 flex justify-end space-x-5">
					<StandardLink href="/my/submissions">View Your Sessions</StandardLink>

					<HighlightLink href="/activities">Check out the upcoming Activities</HighlightLink>
				</div>
			</div>
		</div>
	</div>
</Layout>
