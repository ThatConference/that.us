<script>
  export let router;

  import ProfileLayout from '../../elements/layouts/Profile.svelte';
  import CommunityCore from './_CommunityCore.svelte';

  const { community } = router.params;
</script>

<ProfileLayout>
  <CommunityCore slug="{community}" />
</ProfileLayout>
