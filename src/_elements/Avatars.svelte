<script>
	export let host;
	export let attendees;

	import config from '$utils/config.public';
	import buildImageSrc from '$utils/image';

	const speakerProfileImage = host?.profileImage || config.defaultProfileImage;
	const speakerSrcset = buildImageSrc(speakerProfileImage, ['64']);

	function getSrcSet(attendee) {
		const userProfileImage = attendee.profileImage || config.defaultProfileImage;
		return buildImageSrc(userProfileImage, ['64']);
	}
</script>

<div class="flex flex-wrap -space-x-4 overflow-hidden">
	{#if host}
		<img
			class="inline-block h-16 w-16 rounded-full ring-2 ring-white"
			data-sizes="auto"
			data-src={speakerSrcset.src}
			data-srcset={speakerSrcset.srcset}
			alt="{host.firstName} {host.lastName}" />
	{/if}

	{#each attendees as attendee, i}
		<span class="" class:-ml-2={host || i > 0}>
			<a href="/members/{attendee.profileSlug}/">
				<img
					class="lazyload inline-block h-16 w-16 rounded-full ring-2 ring-white"
					data-sizes="auto"
					data-src={getSrcSet(attendee).src}
					data-srcset={getSrcSet(attendee).srcset}
					alt={`${attendee.firstName} ${attendee.lastName}`}
					title={`${attendee.firstName} ${attendee.lastName}`} />
			</a>
		</span>
	{/each}
</div>
