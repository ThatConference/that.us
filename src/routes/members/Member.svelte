<script>
  export let router;

  import { getClient } from '@urql/svelte';

  import MemberCore from './_MemberCore.svelte';
  import ProfileLayout from '../../elements/layouts/Profile.svelte';
  import memberApi from '../../dataSources/api.that.tech/members';

  const { member } = router.params;
  const { queryMemberBySlug } = memberApi(getClient());
</script>

<ProfileLayout>
  {#await queryMemberBySlug(member) then r}
    <MemberCore member="{r}" />
  {/await}
</ProfileLayout>
