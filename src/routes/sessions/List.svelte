<script>
  import { Link } from 'yrv';

  import SessionList from '../../components/sessions/List.svelte';
  import Nav from '../../components/Nav.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';

  import NewList from '../../components/sessionsNew/Card.svelte';

  import { ActionHeader, LinkButton } from '../../elements';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="Session Schedule">
      <LinkButton href="/sessions/create" text="Create New Session" />
    </ActionHeader>
  </div>

  <div slot="body">
    <!-- <SessionList /> -->
    <NewList />
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
