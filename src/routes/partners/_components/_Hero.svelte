<script>
	export let partner;
	export let isFollowing = false;
	export let wasContactExchanged = false;

	import { createEventDispatcher } from 'svelte';
	import { session } from '$app/stores';

	import { Standard as StandardButton } from '$elements/buttons';
	import { Standard as StandardLink } from '$elements/links';
	import { SocialLink } from '$components/social';

	const dispatch = createEventDispatcher();
</script>

<section class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="mb-24">
		<div class="flex flex-col space-y-8">
			<h1 class="text-base font-semibold uppercase leading-6 tracking-wide text-thatOrange-400">
				PARTNER SPOTLIGHT
			</h1>
			<div class="flex justify-between">
				<div>
					<div class="transform cursor-pointer transition duration-500 ease-in-out hover:scale-105">
						<a href="{partner.website}?utm_source=THAT">
							<img class="lazyload w-96" src={partner.companyLogo} alt={partner.companyName} />
						</a>
					</div>

					<div class="flex flex-col py-8 font-bold text-gray-500">
						{#if partner.city && partner.state}
							<h3 class="tracking-tight">{partner.city}, {partner.state}</h3>
						{/if}

						<div class="flex space-x-2 pt-4">
							{#each partner.socialLinks as link}
								<SocialLink {...link} />
							{/each}
						</div>
					</div>
				</div>

				<div class="flex flex-col space-y-8">
					<div class="flex justify-end space-x-4">
						<StandardLink class="h-3/4" href="{partner.website}?utm_source=THAT" open={true}>
							Visit
						</StandardLink>

						{#if $session.isAuthenticated}
							<!-- TODO.. Needs a bit of work.
                <StandardButton
                  class="h-3/4"
                  on:click="{() => dispatch('XCHANGE_CONTACT')}">
                  {#if !wasContactExchanged}
                    Exhange Contact Information
                  {:else}
                    Contact Exchang ed
                  {/if}
                </StandardButton> -->

							<StandardButton class="h-3/4" on:click={() => dispatch('TOGGLE_FOLLOW')}>
								{#if !isFollowing}Follow{:else}Un-Follow{/if}
							</StandardButton>
						{/if}
					</div>
				</div>
			</div>

			<div class="leading-8 text-gray-800">
				<p class="lineBreaks prose-xl">{partner.aboutUs || ''}</p>
			</div>
		</div>
	</div>
</section>
