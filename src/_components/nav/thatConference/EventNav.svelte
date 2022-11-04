<script>
	import { Shell as ShellButton } from '$elements/buttons';
	import NavLink from './components/navLink.svelte';
</script>

<div class="relative bg-white py-6">
	<div class="mx-auto flex max-w-screen-xl items-center">
		<div>
			<img class="w-36" src="/images/ThatConferenceLogo.svg" alt="THAT Logo" />
		</div>

		<!-- links -->
		<div class="ml-12 flex text-sm font-bold">
			<NavLink href="/wi/">Wisconsin</NavLink>
			<NavLink href="/tx/">Texas</NavLink>
			<NavLink href="/partners/">Sponsors</NavLink>
			<NavLink href="/support/travel/">Travel</NavLink>
		</div>

		<div class="flex w-full flex-1 justify-end space-x-4">
			<div>
				<ShellButton>
					<div class="py-2 px-4">
						<a href="/support/contact-us"> Contact Us </a>
					</div>
				</ShellButton>
			</div>
			<div>
				<ShellButton>
					<div class="py-2 px-4">
						<a href="/sponsorships/apply/#prospectus"> Sponsorship Prospectus </a>
					</div>
				</ShellButton>
			</div>
		</div>
	</div>
</div>
