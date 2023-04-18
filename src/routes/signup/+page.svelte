<script>
	import { fade } from 'svelte/transition';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import { Standard as StandardLink } from '$elements/links';
	import Newsletter from '$components/newsletter/Short.svelte';

	import WelcomeQuote from '../support/_components/_WelcomeQuote.svelte';

	const metaTags = ((title = 'Create your THAT account and profile today and get involved.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create your account today and join in the conversation.',
			openGraph: {
				url: `https://that.us/signup`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="overflow-hidden py-20">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<header>
				<h1
					class="pb-16 text-4xl font-extrabold leading-10 tracking-tight
          text-thatBlue-800 sm:text-center sm:text-5xl sm:leading-none
          md:text-6xl lg:text-left">
					Sign Up Today!
				</h1>
			</header>

			<main>
				<div
					class="space-y-12 divide-y-2 lg:grid lg:grid-cols-2 lg:items-start lg:gap-32 lg:space-y-0">
					<section>
						<ol class="overflow-hidden">
							<li class="relative pb-10" in:fade={{ delay: 100, duration: 500 }}>
								<div class="absolute left-12 top-4 ml-0.5 mt-0.5 h-full w-1 bg-thatOrange-500" />

								<!-- Complete Step -->
								<!-- todo how do we redirect after login? -->
								<a rel="external" href="/login/" class="group relative flex items-center p-3">
									<span class="flex h-20 items-center">
										<span
											class="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white p-3 ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white">
											<span class="text-5xl font-extrabold">1</span>
										</span>
									</span>
									<span class="ml-4 flex min-w-0 flex-col items-start">
										<span class="text-xl font-semibold uppercase tracking-wide"
											>Create Your Login</span>
										<span class="text-lg text-gray-500">
											You will need an account to create or join any activities.
										</span>
									</span>
								</a>
							</li>
							<li class="relative pb-10" in:fade={{ delay: 300, duration: 500 }}>
								<div class="absolute left-12 top-4 ml-0.5 mt-0.5 h-full w-1 bg-thatOrange-500" />

								<a href="/my/profiles/primary/" class="group relative flex items-center p-3">
									<span class="flex h-20 items-center">
										<span
											class="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white p-3 ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white">
											<span class="text-5xl font-extrabold">2</span>
										</span>
									</span>
									<span class="ml-4 flex min-w-0 flex-col">
										<span class="text-xl font-semibold uppercase tracking-wide"
											>Tell Us About Yourself</span>
										<span class="text-lg text-gray-500">
											Tell everyone a bit about who you are and where to find you on the internet.
										</span>
									</span>
								</a>
							</li>
							<li class="relative pb-10" in:fade={{ delay: 500, duration: 500 }}>
								<a href="/support/" class="group relative flex items-center p-3">
									<span class="flex h-20 items-center">
										<span
											class="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white p-3 ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white">
											<span class="text-5xl font-extrabold">3</span>
										</span>
									</span>
									<span class="ml-4 flex min-w-0 flex-col">
										<span class="text-xl font-semibold uppercase tracking-wide">Get Started!</span>
										<span class="text-lg text-gray-500">
											We've put together a few words on how to get started with THAT.
										</span>
									</span>
								</a>
							</li>
						</ol>
					</section>
					<div class="relative mx-auto max-w-prose text-base lg:max-w-none">
						<WelcomeQuote />
					</div>

					<section class="col-span-2 pt-16">
						<h2
							class="pb-16 text-4xl font-extrabold leading-10 tracking-tight text-thatBlue-800 sm:text-center sm:text-5xl sm:leading-none
						md:text-6xl lg:text-left">
							Join The Daily Conversation
						</h2>
						<div class="space-y-8 lg:grid lg:grid-cols-6 lg:items-center lg:gap-8">
							<div class="col-span-2">
								<img class="w-72" src="/images/SlackLogo.svg" alt="slack logo" />
							</div>
							<div class="col-span-4 flex flex-col items-start space-y-6 text-lg text-gray-500">
								<p class="prose prose-lg">
									Yes we have a Slack channel too. It's also a very active one and we'd love to
									invite you to it as well. Requesting access is easy, just head over to your
									profile and hit a button.
								</p>
								<StandardLink href="/my/profiles/slack/">Request Access Today</StandardLink>
							</div>
						</div>
					</section>

					<section class="col-span-2 pt-16">
						<h2
							class="pb-16 text-4xl font-extrabold leading-10 tracking-tight text-thatBlue-800 sm:text-center sm:text-5xl sm:leading-none
						md:text-6xl lg:text-left">
							Newsletter and Announcements
						</h2>
						<div class="space-y-8">
							<Newsletter />
						</div>
					</section>
				</div>
			</main>
		</div>
	</div>
</Layout>
