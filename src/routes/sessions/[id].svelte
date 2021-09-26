<script context="module">
	export async function load({ page }) {
		const { id } = page.params;

		return {
			status: 301,
			redirect: `/activities/${id}`
		};
	}
</script>
