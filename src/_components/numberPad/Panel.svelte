<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import PanelButton from './PanelButton.svelte';
</script>

<div id="panel" class="grid-rows-7 col-span-1 col-start-5 row-span-4 row-start-2 grid grid-cols-3">
	<PanelButton
		bold
		on:press={() => dispatch('digit', 1)}
		class="col-span-1 col-start-1 row-span-1 row-start-1"
	>
		1
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 2)}
		class="col-span-1 col-start-2 row-span-1 row-start-1"
	>
		2
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 3)}
		class="col-span-1 col-start-3 row-span-1 row-start-1"
	>
		3
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 4)}
		class="col-span-1 col-start-1 row-span-1 row-start-2"
	>
		4
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 5)}
		class="col-span-1 col-start-2 row-span-1 row-start-2"
	>
		5
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 6)}
		class="col-span-1 col-start-3 row-span-1 row-start-2"
	>
		6
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 7)}
		class="col-span-1 col-start-1 row-span-1 row-start-3"
	>
		7
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 8)}
		class="col-span-1 col-start-2 row-span-1 row-start-3"
	>
		8
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 9)}
		class="col-span-1 col-start-3 row-span-1 row-start-3"
	>
		9
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('digit', 0)}
		class="col-span-1 col-start-2 row-span-1 row-start-4"
	>
		0
	</PanelButton>

	<PanelButton
		bold
		on:press={() => dispatch('backspace')}
		class="col-span-1 col-start-3 row-span-1 row-start-4"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
			/>
		</svg>
	</PanelButton>
</div>
