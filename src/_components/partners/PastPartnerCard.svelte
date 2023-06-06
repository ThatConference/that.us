<script>
	export let companyName;
	export let companyLogo;
</script>

<div class="flex flex-1 flex-col p-4">
	<img class="mx-auto h-16 w-32 flex-shrink-0" src={`${companyLogo}`} alt="{companyName} logo" />

	<h3 class="text-md mt-2 font-semibold leading-5 tracking-tight text-gray-500">
		{`${companyName}`}
	</h3>
</div>
