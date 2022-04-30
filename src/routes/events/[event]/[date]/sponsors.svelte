<script context="module">
	export async function load({ stuff }) {
		const { eventSlug } = stuff;

		return {
			status: 302,
			redirect: `/partners/${eventSlug}`
		};
	}
</script>
