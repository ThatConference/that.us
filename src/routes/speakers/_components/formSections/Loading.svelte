<script>
	import { onDestroy } from 'svelte';
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
	<div class="flex items-center justify-start space-x-6">
		<Busy size="60" />
		<div class="flex-grow text-xl text-gray-500">{message}</div>
	</div>
</div>
