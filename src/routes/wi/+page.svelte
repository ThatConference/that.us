<script context="module">
	import { events } from '$utils/config';

	export async function load() {
		return {
			status: 302,
			redirect: `/events/${events.next.wi.slug}/`
		};
	}
</script>
