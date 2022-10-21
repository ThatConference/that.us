<script>
	export let imagePath;
	export let isCenter = false;
</script>

<div class="-mt-24">
	<div class="relative overflow-hidden">
		<div
			style="background-image: linear-gradient(rgba(31, 42, 99, 0.8), rgba(31, 42, 99, 0.8)), url({imagePath});"
			class="bg-cover"
			class:bg-center={isCenter}
			class:bg-top={!isCenter}>
			<div class="mx-auto max-w-screen-xl px-4 pt-12 sm:px-6">
				<div class="pt-36">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
