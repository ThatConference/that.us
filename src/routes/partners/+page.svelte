<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	import Hero from './_components/_PartnersHero.svelte';
	import Level from './_components/_Level.svelte';

	let { levels } = data;
	const metaTags = ((title = `Visit these sponsors who've made THAT Conference possible.`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Thank you to those who support our great community every day.',
			ogImages: {
				twitter: 'sponsors-Twitter.jpg',
				facebook: 'sponsors-Facebook.jpg',
				linkedIn: 'sponsors-LinkedIn.jpg'
			},
			openGraph: {
				type: 'website',
				url: `https://that.us/partners/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<main class="overflow-hidden">
		<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
			<div class="mx-auto mt-32 max-w-screen-xl px-4 sm:px-6 xl:mt-40">
				<Hero />
				<div class="relative">
					<div class="mx-auto max-w-2xl lg:max-w-7xl">
						{#if levels['PIONEER']}
							<Level header="Pioneer Sponsors" partners={levels['PIONEER']} />
						{/if}

						{#if levels['EXPLORER']}
							<Level header="Explorer Sponsors" partners={levels['EXPLORER']} />
						{/if}

						{#if levels['SCOUT']}
							<Level header="Scout Sponsors" partners={levels['SCOUT']} />
						{/if}

						{#if levels['CUB']}
							<Level header="Family Sponsors" partners={levels['CUB']} />
						{/if}

						{#if levels['PATRON']}
							<Level header="Patron Sponsors" partners={levels['PATRON']} />
						{/if}

						{#if levels['MEDIA']}
							<Level header="Media Sponsors" partners={levels['MEDIA']} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</main>
</Layout>
