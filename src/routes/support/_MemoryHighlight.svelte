<script>
  export let imageSrc = '';
  import { fade } from 'svelte/transition';
</script>

<div in:fade="{{ delay: 300, duration: 2000 }}">
  <div class="pb-16 rounded-lg bg-thatBlue-800 lg:pb-0 lg:z-10 lg:relative">
    <div
      class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-8">
      <div class="relative lg:-my-8">
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden">
        </div>
        <div
          class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
          <div
            class="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
            <img
              class="object-cover lg:h-full lg:w-full"
              src="{imageSrc}"
              alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
