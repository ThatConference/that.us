<script>
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	import { Busy } from '$elements';

	let messages = [
		'Calling Clouds',
		'Starting Functions',
		'Calibrating DTUs',
		'Flashing ROM',
		'Recompiling',
		'Reformatting Database',
		'Cycling Power',
		'Calling Support',
		'Checking Version Numbers',
		'Deploying New Code',
		'Paying Bill'
	];

	let message = 'Calling Clouds';

	const intervalId = setInterval(() => {
		message = messages[Math.floor(Math.random() * 11)];
	}, 2000);

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<div class="space-y-4">
	<slot name="header" />
</div>

<div class="mt-8">
	<div class="flex justify-start items-center space-x-6">
		<Busy size="60" />
		<div class="flex-grow text-gray-500 text-xl">{message}</div>
	</div>
</div>
