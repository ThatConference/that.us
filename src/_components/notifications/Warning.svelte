<script>
	export let message;
	import Icon from 'svelte-awesome';
	import { warning } from '$components/svelte-awesome-icons';
</script>

<button type="button" on:click>
	<div class="fixed inset-x-0 bottom-0 z-10 pb-2 sm:pb-5">
		<div class="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8">
			<div class="rounded-lg bg-yellow-100 p-2 shadow-lg sm:p-3">
				<div class="flex flex-wrap items-center justify-between">
					<div class="flex w-0 flex-1 items-center">
						<span class="flex rounded-lg p-2">
							<Icon data={warning} class="h-6 w-6 text-black" />
						</span>
						<p class="ml-3 truncate font-medium text-black">
							<span class="hidden md:inline">{message}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</button>
