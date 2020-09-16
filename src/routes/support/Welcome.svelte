<script>
  import { fade } from 'svelte/transition';
  import { Link } from 'yrv';

  import Layout from './Layout.svelte';
  import WelcomeQuote from './WelcomeQuote.svelte';
  import { Trees } from '../../elements/svgs';
</script>

<Layout>
  <div class="py-16 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-base max-w-prose mx-auto lg:max-w-none">
        <p
          class="text-base leading-6 text-thatOrange-400 font-semibold
            tracking-wide uppercase"
        >
          Getting Started
        </p>
        <h1
          class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
            text-gray-900 sm:text-4xl sm:leading-10"
        >
          Welcome to THAT!
        </h1>
      </div>
      <div
        class="relative z-10 text-base max-w-prose mx-auto mb-8 lg:max-w-5xl
          lg:mx-0 lg:pr-72"
      >
        <p class="text-lg text-gray-500 leading-7">TODO</p>
      </div>
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
        <div class="relative z-10 mb-12 lg:mb-0">
          <div class="mb-10 prose text-gray-500 mx-auto lg:max-w-none">
            <p>TODO</p>
            <ul>
              <li>
                <Link href="/sessions">Checkout the upcoming activities.</Link>
              </li>
              <li>
                <Link href="/sessions">Join an activity.</Link>
              </li>
              <li>
                <Link href="/sessions/create">Create your own activity.</Link>
              </li>
            </ul>
            <p>TODO</p>
            <h2>TODO</h2>
            <p>TODO</p>
          </div>
          <div class="flex text-base max-w-prose mx-auto lg:max-w-none">
            <div class="rounded-md shadow">
              <Link
                href="/sessions"
                class="w-full flex items-center justify-center px-5 py-3 border
                  border-transparent text-base leading-6 font-medium rounded-md
                  text-white bg-indigo-600 hover:bg-indigo-500
                  focus:outline-none focus:border-indigo-700
                  focus:shadow-outline-indigo transition duration-150
                  ease-in-out"
              >
                View THAT Board
              </Link>
            </div>
            <div class="rounded-md shadow ml-4">
              <Link
                href="#"
                class="w-full flex items-center justify-center px-5 py-3 border
                  border-transparent text-base leading-6 font-medium rounded-md
                  text-indigo-600 bg-white hover:text-indigo-500
                  focus:outline-none focus:border-indigo-300
                  focus:shadow-outline-indigo transition duration-150
                  ease-in-out"
              >
                What's an activity?
              </Link>
            </div>
          </div>
        </div>
        <div class="relative text-base max-w-prose mx-auto lg:max-w-none">
          <div transition:fade="{{ delay: 200, duration: 2000 }}">
            <Trees
              classes="opacity-25 absolute top-0 right-0 mt-40 mr-80 lg:top-auto
          lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0
          xl:right-0 xl:-mt-40 xl:-mr-80"
            />
          </div>

          <WelcomeQuote />
        </div>
      </div>
    </div>
  </div>
</Layout>
