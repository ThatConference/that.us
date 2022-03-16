<section class="bg-thatBlue-100 bg-opacity-25 py-12 lg:py-16">
	<div
		class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:flex lg:items-center
			lg:justify-between lg:px-8">
		<h2
			class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
			<slot />
		</h2>
		<div class="mt-8 flex space-x-4 lg:mt-0 lg:flex-shrink-0">
			<div class="inline-flex">
				<slot name="actionPrimary" />
			</div>
			<div class="inline-flex">
				<slot name="actionSecondary" />
			</div>
		</div>
	</div>
</section>
