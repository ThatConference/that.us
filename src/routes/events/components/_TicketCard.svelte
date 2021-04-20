<script>
  export let ticketDetails;

  import { Check } from '../../../elements/svgs';
  import { Shell as StandardShell } from '../../../elements/buttons';
</script>

<div class="flex-grow min-h-full w-full relative rounded-lg shadow-lg">
  <div>
    <div class="absolute inset-0 rounded-lg border-t-2 border-thatOrange-500">
    </div>
    <div class="absolute inset-x-0 top-0 transform translate-y-px">
      <div class="flex justify-center transform -translate-y-1/2">
        <span
          class="inline-flex rounded-full bg-thatOrange-500 px-6 py-1 text-md font-bold tracking-wider uppercase text-white">
          {ticketDetails.title}
        </span>
      </div>
    </div>
  </div>

  <div class="h-full bg-gray-100 rounded-lg grid grid-cols-1 grid-rows-2">
    <div class="flex-grow px-6 py-8 bg-white rounded-lg sm:p-10 sm:pb-6">
      <div>
        <p class="text-6xl font-extrabold">
          ${ticketDetails.price}
        </p>
      </div>

      <div class="mt-5">
        <p class="text-lg text-gray-500">
          {ticketDetails.description}
        </p>
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div class="flex-grow px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
        <ul>
          {#each ticketDetails.includes as item}
            <li class="flex">
              <div>
                <Check />
              </div>
              <p class="ml-3 text-base text-gray-700">{item}</p>
            </li>
          {/each}
        </ul>
      </div>

      <div class="relative mt-2 p-4">
        <StandardShell>
          <button class="w-full px-8 md:px-10 py-2">Purchase</button>
        </StandardShell>
      </div>
    </div>
  </div>
</div>
