<script>
  import { Link } from 'yrv';

  import Nav from '../../components/nav/Top.svelte';
  import SessionsList from '../../components/sessions/List.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';

  import { ActionHeader, LinkButton } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="THAT Schedule">
      <LinkButton href="/sessions/create" text="Create New Session" />
    </ActionHeader>
  </div>

  <div slot="body">
    <SessionsList />
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
