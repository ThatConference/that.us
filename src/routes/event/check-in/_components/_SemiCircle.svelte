<script>
	export let series = 0;
	export let title = '';

	import ProgressBar from '@okrad/svelte-progressbar';
</script>

<div class="flex flex-col items-center">
	<ProgressBar
		width={120}
		thickness={10}
		style="semicircle"
		series={[series]}
		thresholds={[
			{
				till: 50,
				color: '#800000'
			},
			{
				till: 75,
				color: '#FF834D'
			},
			{
				till: 90,
				color: '#26529A'
			},
			{
				till: 100,
				color: '#008000'
			}
		]}
	/>
	<p class="py-2 font-extrabold">{title}</p>
</div>
