<script>
	import { page } from '$app/stores';
	// import { fade } from 'svelte/transition';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import Icon from 'svelte-awesome';
	import * as flashModule from 'sveltekit-flash-message/client';

	import { envelope } from '$components/svelte-awesome-icons';
	import newsletterSchema from '$lib/formSchemas/newsletter';

	const { form, enhance, constraints, errors } = superForm(superValidateSync(newsletterSchema), {
		dataType: 'json',
		validators: newsletterSchema,
		syncFlashMessage: false,
		flashMessage: {
			module: flashModule
		}
	});
</script>

<div class="flex flex-col text-gray-500">
	<form
		use:enhance
		method="POST"
		action="/api/newsletter?ref={$page.url}"
		id="newsletterForm"
		class="w-full">
		<div class="flex items-center rounded border border-slate-100 bg-white p-2 shadow-lg">
			<span class="text-slate-400"><Icon data={envelope} class="ml-2 h-6 w-6" /></span>
			<input
				class="peer mx-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight placeholder:italic placeholder:text-slate-400 invalid:text-pink-600 focus:border-none focus:outline-none focus:ring-0"
				type="email"
				name="email"
				placeholder="Your email address"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email} />

			<button
				type="submit"
				class="whitespace-nowrap rounded-md bg-thatBlue-500 px-4 py-1 font-bold text-white transition
				duration-150 ease-in-out hover:bg-thatBlue-300 focus:bg-thatBlue-300 focus:outline-none focus:ring-0">
				Join Free
			</button>
		</div>
		<!-- 
			
			Saving for when we turn on gdpr on hubspot
			
			{#if $tainted}
			<div in:fade class="mt-4 space-y-2">
				<div class="flex space-x-4">
					<input type="checkbox" />
					<span class="text-sm"
						>Yes, I’d like to receive additional marketing emails on hot business opportunities from
						Trends, by THAT.</span>
				</div>
				<p class="text-xs">
					We're committed to your privacy. THAT uses the information you provide to contact you
					about our relevant content and services. You may unsubscribe from these communications at
					any time. For more information, check out our <a href="/support/privacy-policy"
						>Privacy Policy</a
					>.
				</p>
			</div>
		{/if} -->
	</form>

	<!-- 
		{#if $errors.email}
			<div>
				<span>{$errors.email}</span>
			</div>
		{/if}
		
		{#if $message}
			<div class="message">{$message}</div>
		{/if}
	 -->
</div>
