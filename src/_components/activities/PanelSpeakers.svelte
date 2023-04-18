<script>
	export let speakers = [];

	import PanelSpeakerCard from './PanelSpeakerCard.svelte';

	let displayedSpeakers = speakers.filter((s) => s);
</script>

<div>
	<div class="bg-white pb-12 lg:pb-20">
		<div class="relative z-0">
			<div class="absolute inset-0 h-5/6 bg-thatBlue-800 lg:h-2/3" />
			<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
				<div class="relative lg:grid lg:grid-cols-7">
					<div
						class="mx-auto mt-10 max-w-lg lg:col-start-2 lg:col-end-7 lg:row-start-1
            lg:row-end-4 lg:mx-0 lg:mt-0 lg:max-w-none">
						<div class="relative z-10 rounded-lg shadow-xl">
							<div class="pointer-events-none absolute inset-0 rounded-lg" />
							<div class="rounded-t-lg bg-white px-6 pb-10 pt-12">
								<ul class="flex justify-around">
									{#each displayedSpeakers as speaker (speaker.id)}
										<li>
											<PanelSpeakerCard {speaker} />
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
