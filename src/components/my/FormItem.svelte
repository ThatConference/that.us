<div class="mt-6 sm:mt-5">
  <div
    class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t
    sm:border-gray-200 sm:pt-5"
  >
    <slot name="label" />

    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="max-w-lg sm:max-w-xs">
        <slot name="input" />
      </div>
    </div>
  </div>
</div>

<slot />
