<script context="module">
	export async function load({ params }) {
		const { event } = params;

		return {
			status: 302,
			redirect: `/support/travel/${event}/`
		};
	}
</script>
