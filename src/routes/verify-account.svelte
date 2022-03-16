<script>
	import { Standard as StandardLink } from '$elements/links';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	const metaTags = ((title = 'Your account is unverified.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your account is currently unverified.',
			openGraph: {
				type: 'website',
				url: `https://that.us/verify-account`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div
	class="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
	<div class="mx-auto max-w-max">
		<main class="sm:flex">
			<div>
				<img class="h-28" src="/images/characters/Preston@2x.png" alt="Confused Preston" />
			</div>

			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 sm:pl-6">
					<div class="flex">
						<div>
							<h1 class="text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl">
								THAT Account Unverified
							</h1>

							<p class="prose prose-lg mt-4 max-w-3xl text-gray-500">
								You account is current unverified. To continue please check your email and finish
								the login verification. If you've done so and are still seeing this error <span
									class="font-extrabold">please logout and login again</span
								>. Still having issues, then please ask us in chat, or email us at
								<a
									href="mailto:hello@that.us?subject=Account Verification Problem"
									rel="noopener"
									target="_blank"
									class="text-thatOrange-400 hover:text-thatOrange-500 hover:underline"
									>hello@that.us</a
								>.
							</p>
						</div>
					</div>
				</div>
				<div class="mt-10 flex justify-end">
					<div class="flex sm:border-l sm:border-transparent sm:pl-6">
						<StandardLink class="h-3/4" href="/">Home</StandardLink>
					</div>
					<div class="flex sm:border-l sm:border-transparent sm:pl-6">
						<StandardLink class="h-3/4" href="/logout/" rel="external">Logout</StandardLink>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
