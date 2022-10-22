<script>
	import Icon from 'svelte-awesome';

	export let href;
	export let icon;
	export let text;
</script>

<a
	data-sveltekit-prefetch
	{href}
	class="focus:ring-blue relative -mr-px inline-flex flex-1 basis-0 items-center justify-center
  rounded-bl-lg border border-transparent py-2 text-xs font-medium
  leading-4 text-gray-700 transition duration-150
  ease-in-out hover:text-gray-300 focus:z-10 focus:border-blue-300 focus:outline-none">
	<Icon data={icon} class="h-4 w-4" />
	<span class="ml-3">{text}</span>
</a>
