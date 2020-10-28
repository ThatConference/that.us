<script>
  export let router;

  import MemberCore from './_MemberCore.svelte';
  import ProfileLayout from '../../elements/layouts/Profile.svelte';
  import memberApi from '../../dataSources/api.that.tech/members/queries';

  const { member } = router.params;
  const { queryMemberBySlug } = memberApi();
</script>

<ProfileLayout>
  {#await queryMemberBySlug(member) then r}
    <MemberCore member="{r}" />
  {/await}
</ProfileLayout>
