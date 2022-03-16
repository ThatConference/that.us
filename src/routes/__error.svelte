<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script>
	export let error, status;

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

	if (!dev) {
		const thisError = new Error(error.message);
		thisError.name = error.name;
		thisError.stack = error.stack;

		Sentry.captureException(thisError, {
			tags: {
				status
			}
		});
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div
	class="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
	<div class="mx-auto max-w-max">
		<main class="sm:flex">
			<p class="text-4xl font-extrabold text-that-red sm:text-5xl">{status}</p>
			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 sm:pl-6">
					<div class="flex">
						<div>
							<h1 class="text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl">
								{#if status === 404}
									{#if error.message}
										{error.message}
									{:else}
										THAT Page not found
									{/if}
								{:else}
									Well THAT's No Good.
								{/if}
							</h1>

							<p class="mt-1 text-base text-gray-500">
								{#if status === 404}
									Please check the URL in the address bar and try again.
								{:else}
									Well that's no good. We've notified the geeks and logged the error.
								{/if}
							</p>

							{#if dev && error.stack}
								<p class="mt-10 max-w-lg text-base text-red-500">
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
					<StandardLink rel="external" class="h-3/4" href="/">Head back to camp</StandardLink>
				</div>
			</div>
		</main>
	</div>
</div>
