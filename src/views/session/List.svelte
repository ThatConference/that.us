<script>
  export let currentRoute;
  export let params;

  import WideList from '../../components/WideList.svelte';
  import Header from '../../elements/Header.svelte';
  import Nav from '../../components/Nav.svelte';
  import Sponsor from '../../components/SponsorSimple.svelte';
</script>

<div>
  <div class="bg-gray-800 pb-32">
    <Nav />
    <Header title="Sessions">
      <span class="inline-flex rounded-md shadow-sm">
        <button
          on:click="{() => (location = '/session/create')}"
          type="button"
          class="inline-flex items-center px-6 py-3 border border-transparent
          text-base leading-6 font-medium rounded-md text-white bg-indigo-600
          hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
          focus:shadow-outline-indigo active:bg-indigo-700 transition
          ease-in-out duration-150"
        >
          Create New Session
        </button>
      </span>
    </Header>
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <WideList />
      </div>
    </div>
  </main>
  <Sponsor />
</div>
