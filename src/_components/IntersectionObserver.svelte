<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();

	let container;
	let observer;

	onMount(() => {
		if (browser) {
			const handleIntersect = (entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
						dispatch('intersected');
					}
				});
			};

			const options = { threshold: 1, rootMargin: '100% 0% -100%' };
			observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(container);
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div bind:this={container} />
