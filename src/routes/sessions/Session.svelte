<script>
  export let currentRoute;
  export let params;

  export let sessionId;

  import Header from '../../elements/ActionHeader.svelte';
  import Nav from '../../components/Nav.svelte';

  /* 

    take the id.. 
    call graph endpoint
    get session deets.
    populate visual tree


  */

  let title = 'doing something awesome';
</script>

<div>
  <div class="bg-gray-800 pb-32">
    <Nav />
    <Header {title}>
      <span class="inline-flex rounded-md shadow-sm">
        <button
          on:click="{() => (location = '/session/edit')}"
          type="button"
          class="inline-flex items-center px-6 py-3 border border-transparent
          text-base leading-6 font-medium rounded-md text-white bg-indigo-600
          hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
          focus:shadow-outline-indigo active:bg-indigo-700 transition
          ease-in-out duration-150"
        >
          Edit Session
        </button>
      </span>
    </Header>
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        <p>add all the session deets</p>
      </div>
    </div>
  </main>
</div>
