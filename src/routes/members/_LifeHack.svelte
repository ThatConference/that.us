<script>
  export let quote;
  export let name;
</script>

<section class="py-16 lg:py-20 bg-that-offWhite">
  <div
    class="relative max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:flex-col
      items-center lg:justify-between"
  >
    <div class="mx-12 md:mr-0">
      <svg
        class="absolute top-0 transform -translate-x-12 -translate-y-8
      h-16 w-16 text-thatBlue-200"
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
      <h2
        class="relative text-3xl leading-9 font-extrabold tracking-tight text-thatBlue-500
        sm:text-4xl sm:leading-10"
      >
        {quote}
      </h2>
      <div class="mt-4 md:-mr-12 flex justify-end">
        <h3 class="font-semibold tracking-tight uppercase text-thatBlue-500">
          {name}
        </h3>
      </div>
    </div>
  </div>
</section>
