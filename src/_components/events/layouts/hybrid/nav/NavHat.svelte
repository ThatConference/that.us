<script>
	export let event;

	import LeftArrow from '$elements/svgs/LeftArrow.svelte';
	import UserProfile from '$components/nav/UserProfile.svelte';
	import AddActivity from '$components/nav/AddActivity.svelte';
	import Cart from '$components/nav/Cart.svelte';

	const [venue] = event.venues;
</script>

<div class="relative h-16 bg-that-navy px-24 text-white">
	<div class="flex h-full items-center justify-between">
		<div class="font-semibold antialiased">
			<a href="/" class="flex items-center space-x-2 ">
				<LeftArrow />
				<span>Back to THAT.us</span>
			</a>
		</div>
		<div class="flex items-center space-x-12">
			<a href={`/events/${event.slug}`}>
				<div class="flex space-x-4 font-semibold uppercase tracking-wide antialiased">
					<div>THAT Conference</div>
					<div class="uppercase">{`${venue.city}, ${venue.state}`}</div>
				</div>
			</a>
			<div class="flex items-center space-x-4">
				<Cart isDarkBackground={true} />
				<AddActivity isDarkBackground={true} />
				<UserProfile />
			</div>
		</div>
	</div>
</div>
