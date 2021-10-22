<script>
	import dayjs from 'dayjs';

	import { page } from '$app/stores';
	import buildImageSrc from '$utils/image';
	import Layout from '$elements/layouts/ContentLayout.svelte';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import NewsletterSignup from '$components/newsletter.svelte';
	import { getPosts } from '$blog/getPosts';
	import membersQueryApi from '$dataSources/api.that.tech/members/queries';

	async function getPost() {
		const { slug } = $page.params;
		const { queryBlogAuthorBySlug } = membersQueryApi(fetch);

		const post = getPosts().find((post) => slug === post.metadata.slug);
		const author = await queryBlogAuthorBySlug(post.metadata.authorSlug);
		const metaTags = ((bTitle = `${[post.title]} - THAT`) => ({
			title: bTitle,
			tags: seoMetaTags({
				title: bTitle,
				description: `${post.description}`,
				openGraph: {
					image: post.heroImage,
					type: 'website',
					url: `https://that.us/blog/posts/${slug}/`
				}
			})
		}))();

		return {
			author,
			...post.metadata,
			component: post.component,
			srcset: buildImageSrc(author.profileImage, ['96']),
			metaTags
		};
	}

	let center = true;
</script>

{#await getPost() then post}
	<Seo title={post.metaTags.title} tags={post.metaTags.tags} />
	<Layout>
		<div class="py-20 overflow-hidden">
			<div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<article>
					<div class="text-base max-w-prose mx-auto lg:max-w-none" class:text-center={center}>
						<div class="pb-8 flex flex-col items-center">
							<a href={`/members/${post.author.profileSlug}/`}>
								<img
									class="h-24 w-24 rounded-full lazyload"
									data-sizes="auto"
									data-src={post.srcset.src}
									data-srcset={post.srcset.srcset}
									alt={`${post.author.firstName} ${post.author.lastName}`}
								/>
							</a>
						</div>
						<div
							class="text-base leading-6 text-thatOrange-400 font-semibold tracking-wide uppercase"
						>
							<time datetime={dayjs(post.date).toISOString()}
								>{dayjs(post.date).format('MMMM DD, YYYY')}</time
							>
							•
							<span>{post.readingTime.text}</span>
						</div>
						<h1
							class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-wide
        text-gray-900 sm:text-4xl sm:leading-10"
						>
							{post.title}
						</h1>

						<div class="my-12">
							<img
								src={`${post.heroImage}`}
								class="h-[600] w-[335] top-rounded-lg shadow-md"
								alt=""
							/>
							{#if post.heroImageCaption}
								<p class="pt-4 caption text-gray-400">{post.heroImageCaption}</p>
							{/if}
						</div>
					</div>

					<div class="max-w-prose mx-auto">
						<div class="prose prose-lg text-gray-500">
							<svelte:component this={post.component} />
						</div>
					</div>
				</article>
			</div>
		</div>
		<NewsletterSignup />
	</Layout>
{/await}
