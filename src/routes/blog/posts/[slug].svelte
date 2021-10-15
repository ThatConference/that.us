<script context="module">
	import { getPosts } from '$blog/getPosts';
	import membersQueryApi from '$dataSources/api.that.tech/members/queries';

	// export const prerender = true;
	export async function load({ fetch, page: { params } }) {
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
			}
		};
	}
</script>

<script>
	export let center = true;
	export let component;

	// metadata
	export let author;
	export let title;
	export let description;
	export let date;
	export let preview;
	export let readingTime;
	export let slug;
	export let next;
	export let previous;
	export let heroImage;
	export let heroImageCaption;

	import dayjs from 'dayjs';

	import buildImageSrc from '$utils/image';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import NewsletterSignup from '$components/newsletter.svelte';

	const metaTags = ((bTitle = `${title} - THAT`) => ({
		title: bTitle,
		tags: seoMetaTags({
			title: bTitle,
			description: `${description}`,
			openGraph: {
				image: heroImage,
				type: 'website',
				url: `https://that.us/blog/posts/${slug}/`
			}
		})
	}))();

	const srcset = buildImageSrc(author.profileImage, ['96']);
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="py-20 overflow-hidden">
		<div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			<article>
				<div class="text-base max-w-prose mx-auto lg:max-w-none" class:text-center={center}>
					<div class="pb-8 flex flex-col items-center">
						<a href={`/members/${author.profileSlug}/`}>
							<img
								class="h-24 w-24 rounded-full lazyload"
								data-sizes="auto"
								data-src={srcset.src}
								data-srcset={srcset.srcset}
								alt={`${author.firstName} ${author.lastName}`}
							/>
						</a>
					</div>
					<div
						class="text-base leading-6 text-thatOrange-400 font-semibold tracking-wide uppercase"
					>
						<time datetime={dayjs(date).toISOString()}>{dayjs(date).format('MMMM DD, YYYY')}</time>
						•
						<span>{readingTime.text}</span>
					</div>
					<h1
						class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-wide
        text-gray-900 sm:text-4xl sm:leading-10"
					>
						{title}
					</h1>

					<div class="my-12">
						<img src={`${heroImage}`} class="h-[600] w-[335] top-rounded-lg shadow-md" alt="" />
						{#if heroImageCaption}
							<p class="pt-4 caption text-gray-400">{heroImageCaption}</p>
						{/if}
					</div>
				</div>

				<div class="max-w-prose mx-auto">
					<div class="prose prose-lg text-gray-500">
						<svelte:component this={component} />
					</div>
				</div>
			</article>

			<!-- <div class="pt-12 flex flex-col space-y-4">
				{#if previous}
					<ButtonLink isBack href={`/blog/posts/${previous.slug}`}>{previous.title}</ButtonLink>
				{/if}

				{#if next}
					<ButtonLink href={`/blog/posts/${next.slug}`}>{next.title}</ButtonLink>
				{/if}
			</div> -->
		</div>
	</div>
	<NewsletterSignup />
</Layout>
