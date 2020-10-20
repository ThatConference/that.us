<script>
  import Icon from 'svelte-awesome';
  import { plusCircle } from 'svelte-awesome/icons';
</script>

<div
  class="w-full h-full py-10 px-6 bg-that-blue text-center shadow rounded-lg xl:px-10 xl:text-left"
>
  <div class="space-y-6 xl:space-y-10">
    <div class="flex justify-center">
      <Icon
        data="{plusCircle}"
        class="text-thatBlue-100 h-40 w-40 xl:w-56 xl:h-56"
      />
    </div>

    <div class="space-y-2 xl:flex xl:items-center xl:justify-between">
      <div class="w-full font-medium text-lg leading-6 space-y-1">
        <h4 class="text-white">What Activity will you create?</h4>
        <p class="text-thatBlue-200 text-sm italic">Any Day, Any Time</p>

        <span class="text-thatBlue-200 text-right">
          <p>Your Name Here :)</p>
        </span>
      </div>
    </div>
  </div>
</div>
