<script>
	export let title;
	export let shortDescription;
	export let id;
	export let startTime;
	export let durationInMinutes;
	export let slug;

	import Icon from 'svelte-awesome';
	import { calendarCheckO } from '$components/svelte-awesome-icons';

	import ical from '$utils/ical.js';

	// todo.. this needs to be looked at more. Buffer not defined error, might be a vite issue... we used to load nodepolyfills with rollup.
	let url = '/';

	function createICal() {
		url = ical(title).create({
			title,
			shortDescription,
			id,
			startTime,
			durationInMinutes
		});
	}
</script>

<a
	href={url}
	download={`${slug}@that.us.ics`}
	on:click={createICal}
	class="inline-flex items-center justify-center py-2 px-4">
	<Icon data={calendarCheckO} class="-ml-1 mr-2 h-4 w-4" />
	<span>Add To Calendar</span>
</a>
