<script>
  export let router;

  import MemberCore from './_MemberCore.svelte';
  import ProfileLayout from '../../elements/layouts/Profile.svelte';

  const { member } = router.params;
</script>

<ProfileLayout>
  <MemberCore slug="{member}" />
</ProfileLayout>
