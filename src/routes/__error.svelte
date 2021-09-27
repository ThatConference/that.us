<script context="module">
	export function load({ error, status }) {
		console.error(error);

		return {
			props: { error, status }
		};
	}
</script>

<script>
	export let error, status;

	import { onMount } from 'svelte';
	import { dev } from '$app/env';
	import * as Sentry from '@sentry/browser';

	import { Standard as StandardLink } from '$elements/links';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	const metaTags = ((title = 'THAT ERROR PAGE') => ({
		title,
		tags: seoMetaTags({
			title,
			description: "Well THAT's No Good.",
			openGraph: {
				type: 'website',
				url: `https://that.us/`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	onMount(() => {
		Sentry.captureException(error);
	});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div
	class="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
>
	<div class="max-w-max mx-auto">
		<main class="sm:flex">
			<p class="text-4xl font-extrabold text-that-red sm:text-5xl">{status}</p>
			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 sm:pl-6">
					<div class="flex">
						<div>
							<h1 class="text-4xl font-extrabold text-thatBlue-800 tracking-tight sm:text-5xl">
								{#if status === 404}
									THAT Page not found
								{:else}
									Well THAT's No Good.
								{/if}
							</h1>

							<p class="mt-1 text-base text-gray-500">
								{#if status === 404}
									Please check the URL in the address bar and try again.
								{:else}
									Well that's no good. Would you like to log an error? [button here]
								{/if}
							</p>

							{#if dev && error.stack}
								<p class="max-w-lg mt-10 text-base text-red-500">
									{error.stack}
								</p>
							{/if}
						</div>
						<div>
							<img class="h-32" src="/images/characters/Preston@2x.png" alt="Confused Preston" />
						</div>
					</div>
				</div>
				<div class="mt-10 flex sm:border-l sm:border-transparent sm:pl-6">
					<StandardLink class="h-3/4" href="/">Head back to camp</StandardLink>
				</div>
			</div>
		</main>
	</div>
</div>
