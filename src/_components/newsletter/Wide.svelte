<script>
	import HubspotForm from './HubspotForm.svelte';
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
	<div
		class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:flex lg:items-center
      lg:px-8">
		<div class="lg:w-0 lg:flex-1">
			<h2
				class="text-4xl font-semibold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none"
				id="newsletter-headline">
				Build Your Network
			</h2>

			<p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
				Get the 5-minute newsletter teaching tens of thousands how to grow their network and create
				the career they love in tech.
			</p>
		</div>
		<div class="mt-8 lg:ml-8 lg:mt-0">
			<HubspotForm />
		</div>
	</div>
</section>
