<script>
	export let firstName;
	export let lastName;
	export let jobTitle;
	export let company;
	export let profileImage;
	export let profileSlug;
	export let earnedMeritBadges = [];
	export let profileLinks = [];

	import buildImageSrc from '$utils/image';
	import config from '$utils/config.public';
	import SocialLinks from '$components/social/SocialLink.svelte';

	const userProfileImage = profileImage || config.defaultProfileImage;
	const srcset = buildImageSrc(userProfileImage, ['128', '500']);
</script>

<a data-sveltekit-prefetch href="/members/{profileSlug}/">
	<div
		class="h-full transform rounded-lg bg-white text-center shadow transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-100 ">
		<div class="flex flex-col p-4">
			<div>
				<span class="relative inline-block">
					<img
						class="lazyload mx-auto h-32 w-32 flex-shrink-0 rounded-full"
						data-sizes="auto"
						data-src={srcset.src}
						data-srcset={srcset.srcset}
						alt="" />

					{#if earnedMeritBadges.length > 0}
						<span class="absolute bottom-0 left-0 block h-12 w-12">
							<img
								class="lazyload"
								src={earnedMeritBadges[0].image}
								alt={earnedMeritBadges[0].name} />
						</span>
					{/if}
				</span>

				<h3 class="text-md mt-4 font-bold leading-5 tracking-tight text-gray-500">
					{`${firstName} ${lastName}`}
				</h3>
			</div>
			<div class="flex-grow">
				<dl class="mt-1 flex flex-col justify-between">
					{#if jobTitle}
						<dt class="sr-only">Title</dt>
						<dd class="text-sm leading-5 text-gray-500">{jobTitle}</dd>
					{/if}

					{#if company}
						<dt class="sr-only">Company</dt>
						<dd class="text-sm leading-5 text-gray-500">{company}</dd>
					{/if}

					<dt class="sr-only">Social Links</dt>
					<dd class="mt-2">
						{#each profileLinks as link}
							<SocialLinks href={link.url} ariaLabel={link.ariaLabel} network={link.linkType} />
						{/each}
					</dd>
				</dl>
			</div>
		</div>
	</div>
</a>
