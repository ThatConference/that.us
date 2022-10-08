<script>
	export let speaker;

	import config from '$utils/config.public';

	let imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

	let userProfileImage = speaker.profileImage
		? `${speaker.profileImage}${imageCrop}`
		: config.defaultProfileImage;
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex items-center justify-center space-x-3 p-3">
		<a open href="/members/{speaker.profileSlug}/" class="flex-shrink-0">
			<span class="relative inline-block">
				<img
					class="lazyload h-40 w-40 rounded-full"
					src={userProfileImage}
					alt={`${speaker.firstName} ${speaker.lastName}`} />

				{#if speaker.earnedMeritBadges.length > 0}
					<span class="h-15 w-15 absolute bottom-0 left-0 block">
						<img
							class="lazyload"
							src={speaker.earnedMeritBadges[0].image}
							alt={speaker.earnedMeritBadges[0].name} />
					</span>
				{/if}
			</span>
		</a>
	</div>

	<div class="mt-2 flex justify-center text-center">
		<span
			class="sm:text-l text-xl font-extrabold leading-none text-gray-900
      lg:text-2xl">
			{`${speaker.firstName} ${speaker.lastName}`}
		</span>
	</div>

	<div class="mt-2 flex flex-col justify-center text-center">
		<h3 class="text-xl leading-none tracking-tight text-gray-600 sm:text-xl">
			{speaker.jobTitle ? speaker.jobTitle : ''}
		</h3>

		<h3 class="text-xl leading-none tracking-tight text-gray-400 sm:text-xl">
			{speaker.company ? speaker.company : ''}
		</h3>
	</div>
</div>
