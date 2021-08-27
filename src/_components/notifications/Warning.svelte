<script>
  export let message;
  import Icon from 'svelte-awesome';
  import { warning } from 'svelte-awesome/icons';
</script>

<button on:click>
  <div class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-10">
    <div class="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-yellow-100 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg">
              <Icon data="{warning}" class="w-6 h-6 text-black" />
            </span>
            <p class="ml-3 font-medium text-black truncate">
              <span class="hidden md:inline">{message}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</button>
