<script>
  export let router;
  
  import { getClient } from '@urql/svelte';

  import ProfileLayout from '../../elements/layouts/Profile.svelte';
  import CommunityCore from './_CommunityCore.svelte';
  import communityApi from '../../dataSources/api.that.tech/communities';
  
  
  const { community } = router.params;
  const { queryCommunityBySlug } = communityApi(getClient());

</script>

<ProfileLayout>
  {#await queryCommunityBySlug(community) then r}
    <CommunityCore community="{r}" />
  {/await}
</ProfileLayout>
