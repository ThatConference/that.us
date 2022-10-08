<script>
	export let data;

	import { setContext } from 'svelte';
	import Layout from '$elements/layouts/ContentLayout.svelte';

	let { dropDownValues } = data;
	setContext('SPEAKER_ACCEPT_ENUMS', dropDownValues);
</script>

<Layout>
	<main class="relative">
		<div class="mx-auto mt-24 max-w-screen-xl px-4">
			<slot />
		</div>
	</main>
</Layout>
