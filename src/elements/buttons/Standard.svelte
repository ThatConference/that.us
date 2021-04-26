<button
  on:click
  class="px-8 py-2 md:px-10
  bg-white rounded-md shadow 
    border-2 border-thatBlue-500
    text-base leading-6 md:text-lg font-medium text-thatBlue-500 
    hover:bg-thatBlue-500 hover:text-white 
    focus:bg-thatBlue-500 focus:text-white focus:outline-none focus:ring-thatBlue-500 focus:border-thatBlue-800 
    transition duration-150 ease-in-out">
  <span>
    <slot />
  </span>
</button>
