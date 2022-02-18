<script>
	export let companyName;
	export let companyLogo;
	export let socialLinks;

	import SocialLinks from '$components/social/SocialLink.svelte';
</script>

<div class="flex flex-1 flex-col p-4">
	<img class="mx-auto h-16 w-32 flex-shrink-0" src={`${companyLogo}`} alt="" />

	<h3 class="text-md mt-2 font-semibold leading-5 tracking-tight text-gray-500">
		{`${companyName}`}
	</h3>
	<dl class="mt-1 flex flex-grow flex-col justify-between">
		<dt class="sr-only">Social Links</dt>
		<dd class="mt-2">
			{#each socialLinks as link}
				<SocialLinks {...link} />
			{/each}
		</dd>
	</dl>
</div>
