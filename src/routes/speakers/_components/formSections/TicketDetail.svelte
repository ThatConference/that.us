<script>
	export let orderId;
	export let orderAllocation;
	export let isOpen = false;

	import { getContext } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import { Busy } from '$elements';
	import { CheckFull } from '$elements/svgs';
	import speakerMutationsApi from '$dataSources/api.that.tech/speakers/mutations';
	import { Shell } from '$elements/buttons';

	const { tShirtSizes, hoodieSizes, dietaryRequirements } = getContext('SPEAKER_ACCEPT_ENUMS');
	const { addOrderAllocationResponses } = speakerMutationsApi();

	let open = isOpen;
	let submitting = false;
	let submitSuccess = false;

	// form values
	let tshirtSizeSelection, hoodieSizeSelection, dietaryRequirementsSelection;

	async function handleUpdateAllocation(e) {
		submitting = true;

		const request = {
			orderId,
			allocationId: orderAllocation.id,
			responses: {
				tshirtSize: tshirtSizeSelection,
				hoodieSize: hoodieSizeSelection,
				dietaryRequirement: dietaryRequirementsSelection
			}
		};

		const result = await addOrderAllocationResponses(request);

		submitSuccess = result.success;
		submitting = false;
	}
</script>

<div class="antialiased mt-6">
	<div
		class="flex-1 flex items-center justify-between border rounded-md bg-gray-50"
		class:bg-green-50={submitSuccess}
		class:border-green-500={submitSuccess}
	>
		<div class="flex-1 px-4 py-2 text-sm">
			<button class="w-full text-left" on:click={() => (open = !open)}>
				<div class="flex justify-between items-center space-x-4">
					<div>
						<p class="text-gray-900 font-semibold">{orderAllocation.product.name}</p>
						<p class="text-gray-500">{orderAllocation.product.shortDescription}</p>
					</div>

					<div class=" text-gray-500">
						{#if !open}
							<svg
								in:fade={{ delay: 200, duration: 300 }}
								xmlns="http://www.w3.org/2000/svg"
								class="animate-bounce h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 14l-7 7m0 0l-7-7m7 7V3"
								/>
							</svg>
						{/if}
					</div>
				</div>
			</button>

			{#if open}
				<form on:submit|preventDefault={handleUpdateAllocation}>
					<div transition:slide|local={{ delay: 0, duration: 350, easing: quintOut }}>
						<div class="px-4 pb-4">
							<div class="mt-4">
								<label class="block">
									<span class="text-gray-700">Please select your t-shirt size.</span>
									<select
										name="tshirtSize"
										bind:value={tshirtSizeSelection}
										class="form-select block w-full mt-1 rounded-md text-sm"
									>
										<option>Please Select</option>
										{#each tShirtSizes.options as option}
											<option value={option.value}>{option.label}</option>
										{/each}
									</select>
								</label>
							</div>

							{#if ['COUNSELOR_AT_THAT'].includes(orderAllocation.product.uiReference)}
								<div class="mt-4">
									<label class="block">
										<span class="text-gray-700">Please select your hoodie size (unisex only).</span>
										<select
											bind:value={hoodieSizeSelection}
											class="form-select block w-full mt-1 rounded-md text-sm"
										>
											<option>Please Select</option>
											{#each hoodieSizes.options as option}
												<option value={option.value}>{option.label}</option>
											{/each}
										</select>
									</label>
								</div>
							{/if}

							{#if ['COUNSELOR_AT_THAT', 'GEEKLING', 'CAMPMATE'].includes(orderAllocation.product.uiReference)}
								<div class="mt-4">
									<label class="block">
										<span class="text-gray-700">Do you have any dietary restrictions?</span>
										<select
											bind:value={dietaryRequirementsSelection}
											class="form-multiselect block w-full mt-1 text-sm"
										>
											<option>Please Select</option>
											{#each dietaryRequirements.options as option}
												<option value={option.value}>{option.label}</option>
											{/each}
										</select>
									</label>
								</div>
							{/if}
						</div>
					</div>

					<div class="my-2 mx-4">
						<div class="flex justify-end">
							{#if !submitSuccess}
								<button disabled={submitting} type="submit">
									<Shell>
										<div class="px-4 py-1">
											{#if submitting}
												<div class="w-28 flex justify-center">
													<Busy size="30" />
												</div>
											{:else}
												Submit Ticket
											{/if}
										</div>
									</Shell>
								</button>
							{:else}
								<div>
									<span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
										<CheckFull />
									</span>
								</div>
							{/if}
						</div>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>
