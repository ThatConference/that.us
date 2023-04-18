<script>
	import Icon from 'svelte-awesome';
	import { plusCircle } from '$components/svelte-awesome-icons';
</script>

<div
	class="h-full w-full rounded-lg bg-that-blue px-6 py-10 text-center shadow xl:px-10 xl:text-left">
	<div class="space-y-6 xl:space-y-10">
		<div class="flex justify-center">
			<Icon data={plusCircle} class="h-40 w-40 text-thatBlue-100 xl:h-56 xl:w-56" />
		</div>

		<div class="space-y-2 xl:flex xl:items-center xl:justify-between">
			<div class="w-full space-y-1 text-lg font-medium leading-6">
				<h4 class="text-white">What Activity will you create?</h4>
				<p class="text-sm italic text-thatBlue-200">Any Day, Any Time</p>

				<span class="text-right text-thatBlue-200">
					<p>Your Name Here :)</p>
				</span>
			</div>
		</div>
	</div>
</div>
