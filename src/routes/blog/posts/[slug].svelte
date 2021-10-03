<script context="module">
	import { getPosts } from '$blog/getPosts';
	import membersQueryApi from '$dataSources/api.that.tech/members/queries';

	export const prerender = true;
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

	import Layout from '$elements/layouts/ContentLayout.svelte';
	import { name, website } from '$blog/info';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import ButtonLink from '../_components/buttonLink.svelte';

	// generated open-graph image for sharing on social media. Visit https://og-image.vercel.app/ to see more options.
	const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
		title
	)}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;

	const url = `${website}/${slug}`;

	const metaTags = ((title = `${title} - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${description}`,
			openGraph: {
				type: 'website',
				url: `https://that.us/blog/posts/${slug}/`
			}
		})
	}))();
</script>

<!-- <svelte:head>
	<title>{title}</title>
	<meta name="description" content={preview} />
	<meta name="author" content={name} />

	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={preview} />
	<meta property="og:image" content={ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={website} />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={preview} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head> -->

<Seo title={metaTags.title} tags={metaTags.tags} />

<Layout>
	<div class="py-20 overflow-hidden">
		<div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			<article>
				<div class="text-base max-w-prose mx-auto lg:max-w-none" class:text-center={center}>
					<div class="pb-8 flex flex-col items-center">
						<a href={`/members/${author.profileSlug}/`}>
							<img
								class="h-24 w-24 rounded-full"
								src={`${author.profileImage}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
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
						<img src={`${heroImage}`} class="bg-white rounded-md shadow-md" alt="" />
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
</Layout>
