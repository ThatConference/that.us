<script context="module">
	import gFetch from '$utils/gFetch';

	export async function load({ page, fetch: sfetch, session, context }) {
		const fetch = gFetch(sfetch);

		const id = page.query.get('id');

		return {
			props: {}
		};
	}
</script>

<script>
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	// import LogoWide from './_components/logo-wide.svelte';
	// import Trees from './_components/trees.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);
</script>

<div class="min-h-screen grid place-items-center p-4">
	<div id="og-image" class="relative w-[640px] h-[360px] bg-gray-50 overflow-hidden" />
</div>
