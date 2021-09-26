<script>
	export let url;
	export let action;

	import { Standard as StandardLink } from '$elements/links';
	import { CTA } from '$elements';
</script>

<CTA>
	<h2
		class="max-w-3xl text-3xl leading-9 font-extrabold tracking-tight text-thatOrange-500
    sm:text-4xl sm:leading-10"
	>
		{action}
	</h2>

	<span slot="actionPrimary">
		<StandardLink href={url} class="h-3/4">Learn More</StandardLink>
	</span>
</CTA>
