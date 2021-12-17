<script>
	export let faqs = [];

	import FAQ from './_FAQ.svelte';
</script>

<div class="relative">
	<div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
		<div class="lg:grid lg:grid-cols-5 lg:gap-16">
			<div class="lg:col-span-2 space-y-4">
				<h2 class="text-3xl font-extrabold text-thatBlue-800">Frequently Asked Questions</h2>
				<p class="text-lg text-gray-500">
					Can’t find the answer you’re looking for? Feel free to
					<a
						href="mailto:hello@that.us"
						class="font-medium text-thatOrange-400 hover:text-thatOrange-500">email us</a
					>
					or reach out in the chat.
				</p>
			</div>

			<dl class="mt-12 lg:mt-0 lg:col-span-3 lg:ml-16">
				{#each faqs as faq}
					<FAQ {...faq} />
				{/each}
			</dl>
		</div>
	</div>
</div>
