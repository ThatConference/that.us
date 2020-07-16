<script>
  import Nav from '../nav/mainNav/MainNav.svelte';
</script>

<div class="relative bg-gray-50 overflow-hidden">
  <div class="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
    <div class="relative h-full max-w-screen-xl mx-auto">
      <svg
        class="absolute right-full transform translate-y-1/4 translate-x-1/4
        lg:translate-x-1/2"
        width="404"
        height="784"
        fill="none"
        viewBox="0 0 404 784"
      >
        <defs>
          <pattern
            id="f210dbf6-a58d-4871-961e-36d5016a0f49"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            ></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="784"
          fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
        ></rect>
      </svg>
      <svg
        class="absolute left-full transform -translate-y-3/4 -translate-x-1/4
        md:-translate-y-1/2 lg:-translate-x-1/2"
        width="404"
        height="784"
        fill="none"
        viewBox="0 0 404 784"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            ></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="784"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </div>
  </div>

  <div class="relative pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
    <div class="max-w-screen-xl mx-auto ">
      <Nav />
    </div>

    <main
      class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16
      lg:mt-20 xl:mt-28"
    >
      <div class="text-center">
        <h2
          class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900
          sm:text-5xl sm:leading-none md:text-6xl"
        >
          <span class="text-indigo-600">Thank You</span>
          <br class="" />
          for supporting
          <span class="text-indigo-600">THAT!</span>
        </h2>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg
          md:mt-5 md:text-xl md:max-w-3xl"
        >
          Some really awesome text here.
        </p>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div class="rounded-md shadow">
            <a
              href="https://thatconference.com/wi/2020/#tickets"
              class="w-full flex items-center justify-center px-8 py-3 border
              border-transparent text-base leading-6 font-medium rounded-md
              text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
              focus:border-indigo-700 focus:shadow-outline-indigo transition
              duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
            >
              Partner Today!
            </a>
          </div>

        </div>
      </div>
    </main>
  </div>
</div>
