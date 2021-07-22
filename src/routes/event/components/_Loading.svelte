<script>
  import { fade } from 'svelte/transition';

  import config from '../../../config';
  import { Chevron } from '../../../elements/svgs';

  let imageCrop = '?auto=format&mask=ellipse&fit=crop&w=256&h=256&q=80';
</script>

<div in:fade="{{ delay: 300, duration: 2000 }}" class=" flex items-center">
  <div class="min-w-0 flex-1 flex items-center">
    <div
      in:fade="{{ delay: 600, duration: 2000 }}"
      class="animate-pulse flex-shrink-0">
      <img
        class="h-12 w-12 rounded-full animate-pulse"
        src="{`${config.defaultProfileImage}${imageCrop}`}"
        alt="" />
    </div>
    <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
      <div in:fade="{{ delay: 900, duration: 2000 }}">
        <div class="animate-pulse h-2 bg-gray-200 rounded w-1/4"></div>

        <p class="mt-2 flex items-center">
          <span class="animate-pulse h-2 bg-gray-200 rounded w-1/2"></span>
        </p>
      </div>

      <div in:fade="{{ delay: 900, duration: 2000 }}" class="hidden md:block">
        <div>
          <div class="animate-pulse h-2 bg-gray-200 rounded w-3/4"></div>

          <div class="mt-2 flex items-center  space-x-2">
            <div class="animate-pulse h-2 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <Chevron />
  </div>
</div>
