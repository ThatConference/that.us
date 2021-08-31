<script>
	import { page } from '$app/stores';

	import MemberCore from './_components/_MemberCore.svelte';
	import ProfileLayout from '$elements/layouts/Profile.svelte';

	const { member } = $page.params;
</script>

<ProfileLayout>
	<MemberCore slug={member} />
</ProfileLayout>
