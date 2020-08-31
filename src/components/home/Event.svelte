<script>
  export let title;
  export let date;
  export let description;
  export let url;
  export let logoUrl;

  import { Link } from 'yrv';
</script>

<Link href="{url}">
  <div class="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
    <div class="relative pb-2/3 sm:pt-2/3">
      <img
        class="absolute inset-0 object-fit h-full w-full shadow-lg rounded-lg
        px-4"
        src="{logoUrl}"
        alt="{title}"
      />
    </div>
    <div class="sm:col-span-2">
      <div class="space-y-4">
        <div class="text-xl leading-6 font-medium space-y-1">
          <h4 class="font-extrabold tracking-tight">{title}</h4>
          <p class="text-thatBlue-500">{date}</p>
        </div>
        <div class="text-lg leading-7">
          <p class="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  </div>
</Link>
