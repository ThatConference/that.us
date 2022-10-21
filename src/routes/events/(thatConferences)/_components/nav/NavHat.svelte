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
		<div class="flex space-x-3">
			<div class="font-semibold antialiased">
				<a href="/" class="flex items-center space-x-2 ">
					<LeftArrow />
					<span>Back to THAT</span>
				</a>
			</div>
			<div>||</div>
			<div class="font-semibold antialiased">
				<a href="/that-conference" class="flex items-center space-x-2 ">
					<span>THAT Conference</span>
				</a>
			</div>
		</div>
		<div class="flex items-center space-x-12">
			<div class="flex space-x-3">
				<a href={`/that-conference`}>
					<div class="flex space-x-4 font-semibold uppercase tracking-wide antialiased">
						<div>THAT Conference</div>
					</div>
				</a>
				<a href={`/events/${event.slug}`}>
					<div class="flex space-x-4 font-semibold uppercase tracking-wide antialiased">
						<div class="uppercase">{`${venue.city}, ${venue.state}`}</div>
					</div>
				</a>
			</div>

			<div class="flex items-center space-x-4">
				<Cart isDarkBackground={true} />
				<AddActivity isDarkBackground={true} />
				<UserProfile />
			</div>
		</div>
	</div>
</div>
