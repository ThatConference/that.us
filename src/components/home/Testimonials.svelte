<script>
  import { fade } from 'svelte/transition';

  // utilities
  import { login } from '../../utilities/security';
</script>

<section class="bg-white py-12 lg:py-16 mt-12">
  <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <svg
      class="hidden lg:block absolute right-full top-1/2 transform
      translate-x-1/2 -translate-y-3/6"
      width="404"
      height="784"
      fill="none"
      viewBox="0 0 404 575"
    >
      <defs>
        <pattern
          id="56409614-3d62-4985-9a10-7ca758a8f4f0"
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
            class="text-thatBlue-100"
            fill="currentColor"
          ></rect>
        </pattern>
      </defs>
      <rect
        width="404"
        height="784"
        fill="url(#56409614-3d62-4985-9a10-7ca758a8f4f0)"
      ></rect>
    </svg>

    <div class="relative lg:flex lg:items-center">
      <div class="hidden lg:block lg:flex-shrink-0">
        <img
          class="h-64 w-64 rounded-full xl:h-80 xl:w-80"
          src="https://that.imgix.net/members/1dcd59be-4677-474d-8087-e0b74e8ab810.jpeg?mask=ellipse&w=500&h=500&fit=crop"
          alt="Clark Sell"
        />
      </div>

      <div class="relative lg:ml-10">
        <svg
          class="absolute top-0 left-0 transform -translate-x-8 -translate-y-24
          h-36 w-36 text-thatBlue-200 opacity-50"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 144 144"
        >
          <path
            stroke-width="2"
            d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09
            32.109 39.09 16.287 0 28.386-13.03 28.386-28.387
            0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93
            2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268
            16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09
            15.822 0 28.386-13.03 28.386-28.387
            0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93
            2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
          ></path>
        </svg>
        <blockquote class="relative">
          <div class="text-2xl leading-9 font-medium text-gray-900">
            <p>
              Our mission is simple, foster a community of geeks who want to
              help one another be awesome. THAT.us is a safe place for all of
              the geeks and geeklings from anywhere, to easily connect and
              support one another in achieving their best self, each and every
              day. Together we can accomplish amazing things and we all have a
              role in making our community the best it can be.
              <button
                class="text-thatOrange-400 hover:text-thatOrange-500"
                on:click="{() => login(document.location.pathname, true)}"
              >
                Join us today!
              </button>
            </p>
          </div>
          <footer class="mt-8">
            <div class="flex">
              <div class="flex-shrink-0 lg:hidden">
                <img
                  class="h-12 w-12 rounded-full"
                  src="https://that.imgix.net/members/5ec3a772-104d-4f6c-a577-9ea30baea982.jpeg?mask=ellipse&w=500&h=500&fit=crop"
                  alt="Clark Sell"
                />
              </div>
              <div class="ml-4 lg:ml-0">
                <div class="text-base leading-6 font-medium text-that-blue">
                  Clark Sell
                </div>
                <div class="text-base leading-6 font-medium text-gray-900">
                  Founder, THAT
                </div>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</section>
