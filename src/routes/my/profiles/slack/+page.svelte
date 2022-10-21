<script>
	import { page } from '$app/stores';
	import lodash from 'lodash';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Busy } from '$elements';
	import { Warning } from '$elements/svgs';
	import membersMutation from '$dataSources/api.that.tech/members/mutations';

	const { isEmpty } = lodash;
	const { requestSlackInvite } = membersMutation();

	const metaTags = ((title = 'Join THAT Slack - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Joing THAT Slack.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/profiles/slack/`
			},
			nofollow: true,
			noindex: true
		})
	}))();

	let results = undefined;
	let loading = false;

	function handleOnClick() {
		loading = true;
		results = undefined;
		return requestSlackInvite().then((r) => {
			loading = false;
			results = r;
		});
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if !isEmpty($page.data.user.profile)}
	<div class="flex flex-col items-start space-y-8">
		<div class="space-y-4">
			<h2 class="text-xl font-bold leading-6 text-gray-900">Join THAT Slack</h2>

			<div class=" prose-sm prose text-gray-500">
				<p>Slack, everyone has one, and we have one too. Join thousands who chat daily.</p>

				<p class="mt-4 leading-5">
					Just hit the button below, and through the magic of API calls, we'll add you to our Slack.
					Currently, we use your profile's email address. Once requested, then check your inbox for
					further instructions. We can't wait to chat.
				</p>
				<p class="mt-4 leading-5">
					You will find our slack at <a href="https://thatslack.slack.com"
						>https://thatslack.slack.com</a>
				</p>
			</div>
		</div>

		<div class="flex items-center space-x-8">
			<button
				type="button"
				class="transform transition duration-500 ease-in-out hover:scale-105"
				on:click={handleOnClick}>
				<img class="w-32" src="/images/add-to-slack.svg" alt="slack signup" />
			</button>

			{#if loading}
				<Busy size="32" />
			{/if}

			{#if results}
				<div class="max-w-sm">
					<p class="prose-sm prose text-gray-500">{results}</p>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="mt-8">
		<div class="flex items-center">
			<div class="mr-4">
				<Warning classes="h-12 w-12 text-red-500" />
			</div>

			<h2 class="prose-xl text-gray-500">
				Please complete your main profile before requesting to join Slack.
			</h2>
		</div>
	</div>
{/if}
