<script>
  import { fade } from 'svelte/transition';
</script>

<blockquote
  in:fade="{{ delay: 300, duration: 2000 }}"
  class="relative bg-white rounded-lg shadow-lg"
>
  <div class="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
    <img src="/images/THAT-Full-Wide.svg" alt="THAT" class="h-8" />
    <div class="relative text-lg text-gray-700 leading-7 font-medium mt-8">
      <svg
        class="absolute top-0 left-0 transform -translate-x-4 -translate-y-2 h-8
          w-8 text-thatBlue-100 opacity-50"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path
          d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
        ></path>
      </svg>
      <p class="relative">
        👋 Hi! I wanted to be the first person here to send you a very warm
        welcome to THAT. I'm really excited to have you here and can't wait to
        collaborate more with you. If you need help getting started or just have
        any questions, please just ask us in the chat below.
      </p>
    </div>
  </div>
  <cite
    class="flex items-center sm:items-start bg-thatBlue-700 rounded-b-lg
      not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10"
  >
    <div class="rounded-full border-2 border-white mr-4 sm:-mt-15 sm:mr-6">
      <img
        class="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300"
        src="https://that.imgix.net/members/1dcd59be-4677-474d-8087-e0b74e8ab810.jpeg?mask=ellipse&w=500&h=500&fit=crop"
        alt=""
      />
    </div>
    <span class="text-thatBlue-200 font-semibold leading-6">
      <strong class="text-white font-semibold">Clark Sell</strong>
      <br class="sm:hidden" /> - Founder, THAT
    </span>
  </cite>
</blockquote>
