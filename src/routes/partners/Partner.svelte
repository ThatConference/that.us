<script>
  export let router;

  import ProfileLayout from '../../elements/layouts/Profile.svelte';
  import PartnerCore from './components/_PartnerCore.svelte';

  const { partner } = router.params;
</script>

<ProfileLayout>
  <PartnerCore slug="{partner}" />
</ProfileLayout>
