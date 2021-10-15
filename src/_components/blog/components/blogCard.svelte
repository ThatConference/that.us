<script>
	export let metadata;

	import dayjs from 'dayjs';
	import buildImageSrc from '$utils/image';

	const srcset = buildImageSrc(metadata.author.profileImage, ['40']);
</script>

<div
	class="transition duration-500 ease-in-out transform hover:scale-105 flex flex-col rounded-lg shadow-lg overflow-hidden"
>
	<div class="flex-shrink-0">
		<img
			class="bg-white h-[600] w-[335] top-rounded-lg object-cover"
			src={`/blog/posts/${metadata.slug}/${metadata.heroImage}`}
			alt=""
		/>
	</div>
	<div class="flex-1 bg-white p-6 flex flex-col justify-between">
		<div class="flex-1">
			<p class="text-sm font-medium text-gray-400">
				<a href={`/blog/posts/${metadata.slug}/`} class="hover:underline uppercase"
					>{metadata.articleType}</a
				>
			</p>
			<a href={`/blog/posts/${metadata.slug}/`} class="block mt-2">
				<p class="text-xl font-semibold text-gray-900">{metadata.title}</p>
				<p class="mt-3 text-base text-gray-500">
					{metadata.description}
				</p>
			</a>
		</div>
		<div class="mt-6 flex items-center">
			<div class="flex-shrink-0">
				<a href={`/members/${metadata.author.profileSlug}/`}>
					<img
						class="h-10 w-10 rounded-full lazyload"
						data-sizes="auto"
						data-src={srcset.src}
						data-srcset={srcset.srcset}
						alt={`${metadata.author.firstName} ${metadata.author.lastName}`}
					/>
				</a>
			</div>
			<div class="ml-3">
				<p class="text-sm font-medium text-gray-900">
					<a href={`/members/${metadata.author.profileSlug}/`} class="hover:underline"
						>{`${metadata.author.firstName} ${metadata.author.lastName}`}</a
					>
				</p>
				<div class="flex space-x-1 text-sm text-gray-500">
					<time datetime={dayjs(metadata.date).toISOString()}
						>{dayjs(metadata.date).format('MMMM DD, YYYY')}</time
					>
					<span aria-hidden="true"> &middot; </span>
					<span>{metadata.readingTime.text}</span>
				</div>
			</div>
		</div>
	</div>
</div>
