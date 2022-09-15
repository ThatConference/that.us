<script context="module">
	import { getPosts } from '$blog/getPosts';
	import membersQueryApi from '$dataSources/api.that.tech/members/queries';

	export async function load({ fetch, params }) {
		const { slug } = params;
		const { queryBlogAuthorBySlug } = membersQueryApi(fetch);

		const post = getPosts().find((post) => slug === post.metadata.slug);
		const author = await queryBlogAuthorBySlug(post.metadata.authorSlug);

		if (!post) {
			return {
				status: 404,
				error: 'Post not found'
			};
		}

		return {
			props: {
				author,
				...post.metadata,
				next: post.next?.metadata,
				previous: post.previous?.metadata,
				component: post.component
			},
			stuff: {
				heroImage: post.metadata.heroImage,
				slug,
				component: post.component
			}
		};
	}
</script>

<script>
	export let center = true;

	// metadata
	export let author;
	export let title;
	export let description;
	export let date;

	export let readingTime;
	export let slug;
	export let heroImage;
	export let heroImageCaption;

	import dayjs from 'dayjs';

	import image from '$blog/image';
	import buildImageSrc from '$utils/image';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import NewsletterSignup from '$components/newsletter/Wide.svelte';

	const { cdnUrl } = image(slug);

	const metaTags = ((bTitle = `${title} by ${author.firstName} ${author.lastName}`) => ({
		title: bTitle,
		tags: seoMetaTags({
			title: bTitle,
			description: `${description}`,
			imageUrl: cdnUrl(heroImage),
			openGraph: {
				type: 'website',
				url: `https://that.us/blog/posts/${slug}/`
			}
		})
	}))();

	const srcset = buildImageSrc(author.profileImage, ['96']);

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://that.us/blog/posts/${slug}/`
		},
		headline: title,
		image: [cdnUrl(heroImage)],
		datePublished: date,
		dateModified: date,
		author: {
			'@type': 'Person',
			name: `${author.firstName} ${author.lastName}`,
			url: `https://that.us/members/${author.slug}/`
		},
		publisher: {
			'@type': 'Organization',
			name: 'THAT',
			logo: {
				'@type': 'ImageObject',
				url: 'https://that.us/that-logo.png'
			}
		}
	};
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="overflow-hidden py-20">
		<div class="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
			<article>
				<div class="mx-auto max-w-prose text-base lg:max-w-none" class:text-center={center}>
					<div class="flex flex-col items-center pb-8">
						<a href={`/members/${author.profileSlug}/`}>
							<img
								class="lazyload h-24 w-24 rounded-full"
								data-sizes="auto"
								data-src={srcset.src}
								data-srcset={srcset.srcset}
								alt={`${author.firstName} ${author.lastName}`} />
						</a>
					</div>
					<div
						class="text-base font-semibold uppercase leading-6 tracking-wide text-thatOrange-400">
						<time datetime={dayjs(date).toISOString()}>{dayjs(date).format('MMMM DD, YYYY')}</time>
						•
						<span>{readingTime.text}</span>
					</div>
					<h1
						class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-wide
        text-gray-900 sm:text-4xl sm:leading-10">
						{title}
					</h1>

					<div class="my-12">
						<img src={cdnUrl(heroImage)} class="top-rounded-lg h-[600] w-[335] shadow-md" alt="" />
						{#if heroImageCaption}
							<p class="caption pt-4 text-gray-400">{heroImageCaption}</p>
						{/if}
					</div>
				</div>

				<div class="mx-auto max-w-prose">
					<div class="prose prose-lg text-gray-500">
						<slot />
					</div>
				</div>
			</article>
		</div>
	</div>

	<NewsletterSignup />
</Layout>

{@html `<script type="application/ld+json">${JSON.stringify(schema) + '<'}/script>`}
