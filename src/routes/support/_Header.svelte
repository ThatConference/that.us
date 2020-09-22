<script>
  export let center = false;
</script>

<div
  class="text-base max-w-prose mx-auto lg:max-w-none"
  class:text-center="{center}"
>
  <p
    class="text-base leading-6 text-thatOrange-400 font-semibold tracking-wide
      uppercase"
  >
    Getting Started
  </p>
  <h1
    class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
      text-gray-900 sm:text-4xl sm:leading-10"
  >
    <slot />
  </h1>
</div>
