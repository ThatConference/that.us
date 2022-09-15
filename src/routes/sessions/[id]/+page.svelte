<script context="module">
	export async function load({ params }) {
		const { id } = params;

		return {
			status: 301,
			redirect: `/activities/${id}`
		};
	}
</script>
