<script>
  import { router } from 'yrv';
  import { getClient } from '@urql/svelte';

  const { partner, job } = $router.params;

  import ProfileLayout from '../../elements/layouts/Profile.svelte';
  import partnerQueryApi from '../../dataSources/api.that.tech/partner/queries';

  import JobHero from './components/_JobHero.svelte';
  import JobDetails from './components/_JobDetails.svelte';

  const { queryPartnerJobListing } = partnerQueryApi(getClient());
</script>

<ProfileLayout>
  {#await queryPartnerJobListing(partner, job) then partner}
    <section>
      <JobHero partner="{partner}" />
    </section>

    <section>
      <JobDetails jobListing="{partner.jobListing}" />
    </section>
  {/await}
</ProfileLayout>
