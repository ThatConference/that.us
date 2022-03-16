<script>
	export let q;
	export let a;

	import { Chevron } from '$elements/svgs';

	let userClicked = false;
</script>

<dt class="mt-4 text-lg">
	<button
		type="button"
		class="flex w-full items-start justify-between text-left text-gray-400"
		on:click|preventDefault={() => (userClicked = !userClicked)}>
		<span class="font-medium text-gray-900">{q}</span>
		<span class="ml-6 flex h-7 items-center">
			<Chevron open={userClicked} />
		</span>
	</button>
</dt>

{#if userClicked}
	<dd class="mt-2 pr-12">
		<p class="text-base text-gray-500">{a}</p>
	</dd>
{/if}
