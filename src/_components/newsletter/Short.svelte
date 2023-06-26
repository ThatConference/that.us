<script>
	import HubspotForm from './HubspotForm.svelte';
</script>

<section class="">
	<div class="relative mx-auto lg:flex lg:items-center">
		<div class="lg:w-0 lg:flex-1">
			<h2
				class="text-3xl font-extrabold leading-9 text-gray-800 sm:text-4xl sm:leading-10"
				id="newsletter-headline">
				Build Your Network, Grow your Career.
			</h2>

			<p class="prose prose-lg mt-3 max-w-3xl text-gray-500">
				Get the <span class="font-bold">5-minute newsletter</span> teaching tens of thousands how to
				grow their network and create the career they love in tech.
			</p>
		</div>
		<div class="m-w-1/3 mt-8 lg:ml-8 lg:mt-0">
			<HubspotForm />
		</div>
	</div>
</section>
