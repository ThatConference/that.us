<script>
	export let community;
</script>

<span class="relative flex">
	<img class="lazyload mx-auto max-h-32 " src={community.logo} alt={community.name} />
</span>

<h3 class="text-md mt-4 font-bold uppercase leading-5 tracking-tight text-gray-500">
	{`${community.name}`}
</h3>

<div class="mt-2">
	<p class="text-sm leading-5 text-gray-500">
		{community.followCount}
		followers
	</p>
	<p class="text-sm leading-5 text-gray-500">
		{community.sessionCount}
		activities
	</p>
</div>
