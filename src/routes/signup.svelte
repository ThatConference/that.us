<script>
	import { fade } from 'svelte/transition';

	import { getAuth } from '$utils/security';
	import seoMetaTags from '$utils/seo/metaTags';

	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import WelcomeQuote from './support/_components/_WelcomeQuote.svelte';

	const { login } = getAuth();

	const metaTags = ((title = 'Signup - THAT') => ({
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
	<div class="py-20 overflow-hidden">
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<header>
				<h1
					class="sm:text-center lg:text-left pb-16 text-4xl tracking-tight
          leading-10 font-extrabold text-thatBlue-800 sm:text-5xl
          sm:leading-none md:text-6xl"
				>
					Sign Up Today!
				</h1>
			</header>

			<main>
				<div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
					<section>
						<ol class="overflow-hidden">
							<li class="relative pb-10" in:fade={{ delay: 100, duration: 500 }}>
								<div class="-ml-px absolute mt-0.5 top-4 left-13 w-1 h-full bg-thatOrange-500" />

								<!-- Complete Step -->
								<button
									class="relative p-3 flex items-center group"
									on:click={() => login('/my/profiles/primary', true)}
								>
									<span class="h-20 flex items-center">
										<span
											class="relative z-10 p-3 w-20 h-20 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white"
										>
											<span class="font-extrabold text-5xl">1</span>
										</span>
									</span>
									<span class="ml-4 min-w-0 flex flex-col items-start">
										<span class="text-xl font-semibold tracking-wide uppercase"
											>Create Your Login</span
										>
										<span class="text-lg text-gray-500">
											You will need an account to create or join any activities.
										</span>
									</span>
								</button>
							</li>
							<li class="relative pb-10" in:fade={{ delay: 300, duration: 500 }}>
								<div class="-ml-px absolute mt-0.5 top-4 left-13 w-1 h-full bg-thatOrange-500" />

								<a href="/my/profiles/primary" class="relative p-3 flex items-center group">
									<span class="h-20 flex items-center">
										<span
											class="relative z-10 p-3 w-20 h-20 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white"
										>
											<span class="font-extrabold text-5xl">2</span>
										</span>
									</span>
									<span class="ml-4 min-w-0 flex flex-col">
										<span class="text-xl font-semibold tracking-wide uppercase"
											>Tell Us About Yourself</span
										>
										<span class="text-lg text-gray-500">
											Tell everyone a bit about who you are and where to find you on the internet.
										</span>
									</span>
								</a>
							</li>
							<li class="relative pb-10" in:fade={{ delay: 500, duration: 500 }}>
								<a href="support/" class="relative p-3 flex items-center group">
									<span class="h-20 flex items-center">
										<span
											class="relative z-10 p-3 w-20 h-20 flex items-center justify-center rounded-full bg-white ring-4 ring-thatOrange-500 group-hover:bg-thatOrange-500 group-hover:text-white"
										>
											<span class="font-extrabold text-5xl">3</span>
										</span>
									</span>
									<span class="ml-4 min-w-0 flex flex-col">
										<span class="text-xl font-semibold tracking-wide uppercase">Get Started!</span>
										<span class="text-lg text-gray-500">
											We've put together a few words on how to get started with THAT.
										</span>
									</span>
								</a>
							</li>
						</ol>
					</section>
					<div class="relative text-base max-w-prose mx-auto lg:max-w-none">
						<WelcomeQuote />
					</div>
				</div>
			</main>
		</div>
	</div>
</Layout>
