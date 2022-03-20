<script context="module">
	export async function load({ params }) {
		const { event, date } = params;

		return {
			status: 302,
			redirect: `/activities/${event}/${date}/`
		};
	}
</script>
