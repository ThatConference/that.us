<script>
  import { Link } from 'yrv';

  import SessionList from '../../components/sessions/List.svelte';
  import ActionHeader from '../../elements/ActionHeader.svelte';
  import Nav from '../../components/Nav.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';

  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';

  export let currentRoute;
  export let params;
</script>

<StackedLayout>

  <div slot="header">
    <Nav />
    <ActionHeader title="Session Schedule">
      <span class="inline-flex rounded-md shadow-sm">
        <Link
          href="/sessions/create"
          class="inline-flex items-center px-6 py-3 border border-transparent
          text-base leading-6 font-medium rounded-md text-white bg-indigo-600
          hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
          focus:shadow-outline-indigo active:bg-indigo-700 transition
          ease-in-out duration-150"
        >
          Create New Session
        </Link>
      </span>
    </ActionHeader>
  </div>

  <div slot="body">
    <SessionList />
  </div>

  <div slot="footer">
    <Sponsor />
  </div>

</StackedLayout>
