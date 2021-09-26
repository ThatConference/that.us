<script>
	export let host;
	export let attendees;

	import config from '$utils/config';

	let imageCrop = '?auto=format&mask=ellipse&fit=crop&w=256&h=256&q=80';
</script>

<div class="flex flex-wrap -space-x-4 overflow-hidden">
	{#if host}
		<img
			class="inline-block h-16 w-16 rounded-full ring-2 ring-white"
			src={`${host.profileImage || config.defaultProfileImage}${imageCrop}`}
			alt="{host.firstName} {host.lastName}"
		/>
	{/if}

	{#each attendees as attendee, i}
		<span class="" class:-ml-2={host || i > 0}>
			<a href="/members/{attendee.profileSlug}">
				<img
					class="inline-block h-16 w-16 rounded-full ring-2 ring-white"
					src={`${attendee.profileImage || config.defaultProfileImage}${imageCrop}`}
					alt={`${attendee.firstName} ${attendee.lastName}`}
					title={`${attendee.firstName} ${attendee.lastName}`}
				/>
			</a>
		</span>
	{/each}
</div>
