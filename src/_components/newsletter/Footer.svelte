<script>
	import { Form, Input } from 'sveltejs-forms';
	import { Circle3 } from 'svelte-loading-spinners';

	import post from './_form';

	let submitted = false;

	function handleSubmit(detail) {
		return post(detail)
			.then(() => {
				submitted = true;
			})
			.catch((error) => console.error('Request failed', error));
	}
</script>

<div class="mt-8 xl:mt-0">
	{#if !submitted}
		<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">
			Subscribe to our newsletter
		</h3>
		<p class="mt-4 text-base text-gray-500">
			The latest news, articles, and resources, sent to your inbox weekly.
		</p>
	{:else}
		<h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
			Thank you for signing up. Welcome to THAT family.
		</h3>
		<p class="mt-4 text-base text-gray-500">
			Please check your inbox to confirm your subscription.
		</p>
	{/if}
	{#if !submitted}
		<div class="mt-4">
			<Form
				on:submit={handleSubmit}
				aria-labelledby="newsletter-headline"
				validateOnBlur={false}
				validateOnChange={false}
				let:isSubmitting>
				{#if !isSubmitting}
					<div class="sm:flex">
						<Input type="hidden" name="u" value="16" />
						<Input type="hidden" name="f" value="16" />
						<Input type="hidden" name="s" />
						<Input type="hidden" name="c" value="0" />
						<Input type="hidden" name="m" value="0" />
						<Input type="hidden" name="act" value="sub" />
						<Input type="hidden" name="v" value="2" />
						<Input
							name="email"
							aria-label="Email address"
							type="email"
							required
							class="w-full min-w-0 appearance-none rounded-md border 
								border-gray-300 bg-white py-2 
								px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm 
								focus:border-thatBlue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-thatBlue-500"
							placeholder="Enter your email" />
						<div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
							<button
								type="submit"
								class="rounded-md border-2 border-thatBlue-500 bg-white px-4 py-2 text-base font-medium
									leading-6 text-thatBlue-500 shadow transition
									duration-150 ease-in-out hover:bg-thatBlue-500 hover:text-white
									focus:border-thatBlue-800 focus:bg-thatBlue-500 focus:text-white
									focus:outline-none focus:ring-thatBlue-500">
								Add me
							</button>
						</div>
					</div>
				{:else}
					<div class="relative my-6 flex flex-col items-center space-y-6">
						<Circle3
							size={'60'}
							unit={'px'}
							ballTopLeft="#f74646"
							ballTopRight="#ff834d"
							ballBottomLeft="#26529A"
							ballBottomRight="#555555" />
					</div>
				{/if}
			</Form>
		</div>
	{/if}
</div>
