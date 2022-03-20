<script>
	export let event;

	import LeftArrow from '$elements/svgs/LeftArrow.svelte';

	const [venue] = event.venues;
</script>

<div class="relative col-span-1 grid h-14 place-self-center bg-that-navy text-white">
	<div class="mx-8 flex items-center justify-between  ">
		<div class="font-semibold antialiased">
			<a href="/" class="flex items-center space-x-2 ">
				<LeftArrow />
				<span>Back to THAT.us</span>
			</a>
		</div>

		<div class="">
			<a href={`/events/${event.slug}`}>
				<div class="flex space-x-4 font-semibold uppercase tracking-wide antialiased">
					<div class="uppercase">{`${venue.city}, ${venue.state}`}</div>
				</div>
			</a>
		</div>
	</div>
</div>
