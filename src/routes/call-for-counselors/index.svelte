<script context="module">
	export async function load({ page }) {
		const { id } = page.params;

		return {
			status: 302,
			redirect: `/call-for-counselors/tx/2022`
		};
	}
</script>
