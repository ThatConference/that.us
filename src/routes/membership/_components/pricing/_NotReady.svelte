<script>
	import { goto } from '$app/navigation';

	import { Highlight as HighlightButton } from '$elements/buttons';
</script>

<div class="bg-thatBlue-800 text-white">
	<div class="relative">
		<div class="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
			<h2 class="text-5xl font-extrabold sm:text-4xl">
				<span class="block">Signup today.</span>
				<span class="block">Join the daily conversation for FREE.</span>
			</h2>
			<div class="mx-auto max-w-2xl text-center">
				<p class="mt-4 text-lg leading-6">
					All you need is a login and profile to get started. Activities happen daily and every day
					is a new oportunity to learn something.
				</p>
			</div>

			<div class="mt-8 w-full">
				<HighlightButton on:click={() => goto('/signup/')}>Create An Account</HighlightButton>
			</div>
		</div>
	</div>
</div>
