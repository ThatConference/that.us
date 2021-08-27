<script>
	import { Standard as StandardLink } from '$elements/links';
	import seoMetaTags from '$utils/seo/metaTags';

	const metaTags = seoMetaTags({
		title: 'Accout Verification- THAT',
		description: 'Your account is unverified.',
		openGraph: {
			type: 'website',
			url: `https://that.us/verify-account`
		},
		noindex: true,
		nofollow: true
	});
</script>

<svelte:head>
	<title>{metaTags.title}</title>

	{#each metaTags as tag}
		<meta {...tag} />
	{/each}
</svelte:head>

<div
	class="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
>
	<div class="max-w-max mx-auto">
		<main class="sm:flex">
			<div>
				<img class="h-28" src="/images/characters/Preston@2x.png" alt="Confused Preston" />
			</div>

			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 sm:pl-6">
					<div class="flex">
						<div>
							<h1 class="text-4xl font-extrabold text-thatBlue-800 tracking-tight sm:text-5xl">
								THAT Account Unverified
							</h1>
							<p class="max-w-3xl mt-1 text-base text-gray-500">
								You account is current unverified. To continue please check your email and finish
								verification or if you think you're seeing this in error, ask us in chat, or email
								us at
								<a
									href="mailto:hello@that.us?subject=Account Verification"
									rel="noopener"
									target="_blank"
									class="text-thatOrange-400 hover:text-thatOrange-500 hover:underline"
									>hello@that.us</a
								>.
							</p>
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
