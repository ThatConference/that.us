<script>
	import LeftArrow from '$elements/svgs/LeftArrow.svelte';
	import UserProfile from '$components/nav/UserProfile.svelte';
	import Cart from '$components/nav/Cart.svelte';
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
		</div>
		<div class="flex items-center space-x-12">
			<div class="flex items-center space-x-4">
				<Cart isDarkBackground={true} />
				<UserProfile />
			</div>
		</div>
	</div>
</div>
