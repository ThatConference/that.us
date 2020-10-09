<script>
  import { circIn, circOut } from 'svelte/easing';
  import { fade, draw } from 'svelte/transition';

  const leftBracket =
    'M187.14 67.49L.5 254.13l51.85 51.85 134.79 134.8 51.85-51.85-134.8-134.8 134.8-134.79-51.85-51.85z';
  const treesPath =
    'M1099.74 367.88L987.56 189.16h41.42L910.14.5 791.3 189.16h41.41L725.5 359.98 618.29 189.16h41.41L540.86.5 422.02 189.16h41.42L351.26 367.88h41.37l-116.79 187h216.85v79.13h96.34v-79.16h272.94v79.13h96.34v-79.13h216.85l-116.79-187 41.37.03zm-410.64 0h72.81l-36.41 58.28-36.4-58.28z';
  const rightBracket =
    'M1398.65 202.29l-134.79-134.8-51.85 51.85 134.8 134.79-134.8 134.8 51.85 51.85 134.79-134.8 51.85-51.85-51.85-51.84z';
</script>

<svg
  width="200px"
  viewBox="0 0 1451 635"
  xmlns="http://www.w3.org/2000/svg"
  fill-rule="evenodd"
  clip-rule="evenodd"
  stroke-linejoin="round"
  stroke-miterlimit="2"
  fill="#ffffff"
>
  <g out:fade="{{ duration: 500 }}" in:fade="{{ duration: 500 }}">
    <path
      in:draw="{{ duration: 500, easing: circIn }}"
      out:draw="{{ duration: 500, easing: circOut }}"
      style="stroke:#f74646; stroke-width: 10px"
      d="{leftBracket}"
    >
      <animate
        attributeName="fill"
        begin="500ms"
        dur="500ms"
        to="#f74646"
        fill="freeze"
      ></animate>
    </path>
    <path
      in:draw="{{ duration: 500, easing: circIn }}"
      out:draw="{{ duration: 500, easing: circOut }}"
      style="stroke:#f74646; stroke-width: 10px"
      d="{treesPath}"
    >
      <animate
        attributeName="fill"
        begin="500ms"
        dur="500ms"
        to="#f74646"
        fill="freeze"
      ></animate>
    </path>
    <path
      in:draw="{{ duration: 500, easing: circIn }}"
      out:draw="{{ duration: 500, easing: circOut }}"
      style="stroke:#f74646; stroke-width: 10px"
      d="{rightBracket}"
    >
      <animate
        attributeName="fill"
        begin="500ms"
        dur="500ms"
        to="#f74646"
        fill="freeze"
      ></animate>
    </path>
  </g>
</svg>
